using Microsoft.VisualStudio.TestTools.UnitTesting;
using CalculationTool.Services;
using CalculationTool.Models;
using System.Collections.Generic;

namespace CalculationTool.Tests
{
    [TestClass]
    public class CalculatieServiceTests
    {
        private CalculatieService _service;
        private List<TariefItemDto> _tarieven;
        private List<NormtijdItemDto> _normtijden;

        [TestInitialize]
        public void Setup()
        {
            _service = new CalculatieService(null); // null want we testen zonder Ridder

            _tarieven = new List<TariefItemDto>
            {
                new TariefItemDto { Label = "Lasersnijden",                        Rate = 2.63   },
                new TariefItemDto { Label = "W.v.b",                               Rate = 91.00  },
                new TariefItemDto { Label = "Zetwerk machine + 1e man",            Rate = 85.00  },
                new TariefItemDto { Label = "Plaatwerk 2e man",                    Rate = 75.00  },
                new TariefItemDto { Label = "Zaagwerk/lassen/beitsen/schuren",     Rate = 75.00  },
                new TariefItemDto { Label = "Boren/tappen/gaten verzinken",        Rate = 70.00  },
                new TariefItemDto { Label = "Uitbreken/afbramen/trommelontbramen", Rate = 64.00  },
                new TariefItemDto { Label = "Walsen",                              Rate = 136.50 },
                new TariefItemDto { Label = "Verpakken",                           Rate = 64.00  },
            };

            _normtijden = new List<NormtijdItemDto>
            {
                new NormtijdItemDto { Label = "Zetting 1e man", Time = 3.5 },
                new NormtijdItemDto { Label = "Zetting 2e man", Time = 2.0 },
                new NormtijdItemDto { Label = "Afbramen",       Time = 2.5 },
                new NormtijdItemDto { Label = "Verpakken",      Time = 3.0 },
            };
        }

        private CalculatieRequestDto MaakRequest(
            List<NestingItemDto> nestingData = null,
            List<MateriaalItemDto> materials = null,
            List<BewerkingItemDto> operations = null,
            List<ExterneBewerkingItemDto> externalOperations = null
        )
        {
            return new CalculatieRequestDto
            {
                NestingData = nestingData ?? new List<NestingItemDto>(),
                Materials = materials ?? new List<MateriaalItemDto>(),
                Operations = operations ?? new List<BewerkingItemDto>(),
                ExternalOperations = externalOperations ?? new List<ExterneBewerkingItemDto>(),
                Tarieven = _tarieven,
                Normtijden = _normtijden,
            };
        }

        // -- Lege input --

        [TestMethod]
        public void BerekenKosten_LegeInput_GeeftNulTotaal()
        {
            var request = MaakRequest();
            var result = _service.BerekenKosten(request);

            Assert.AreEqual(0, result.Totaal, 0.01);
        }

        // -- Totaal --

        [TestMethod]
        public void BerekenKosten_Totaal_IsGelijkAanSomKostenposten()
        {
            var request = MaakRequest(
                nestingData: new List<NestingItemDto>
                {
                    new NestingItemDto
                    {
                        Id = "1", Materiaal = "RVS304", Dikte = "2mm",
                        Lengte = 1000, Breedte = 500, Gewicht = 2.5, Aantallen = 2
                    }
                },
                materials: new List<MateriaalItemDto>
                {
                    new MateriaalItemDto
                    {
                        Id = "1", ArtikelgroepId = null, ZoekCode = null,
                        Dikte = "2mm", Aantallen = 2
                    }
                }
            );

            var result = _service.BerekenKosten(request);
            double verwachtTotaal = 0;
            foreach (var post in result.Kostenposten)
                verwachtTotaal += post.Kostprijs;

            Assert.AreEqual(verwachtTotaal, result.Totaal, 0.01);
        }

        // -- Zetting --

        [TestMethod]
        public void BerekenKosten_Zetting1eman_KloptMetTarief()
        {
            // 60 minuten × tarief 85/uur = 85.00
            var request = MaakRequest(
                operations: new List<BewerkingItemDto>
                {
                    new BewerkingItemDto { Id = "1", Zet1Eman = 60 }
                }
            );

            var result = _service.BerekenKosten(request);
            var zetting = result.Kostenposten.Find(k => k.Label == "Zetting");

            Assert.AreEqual(85.00, zetting.Kostprijs, 0.01);
        }

        [TestMethod]
        public void BerekenKosten_Zetting2eman_KloptMetTarief()
        {
            // 60 minuten × tarief 75/uur = 75.00
            var request = MaakRequest(
                operations: new List<BewerkingItemDto>
                {
                    new BewerkingItemDto { Id = "1", Zet2Eman = 60 }
                }
            );

            var result = _service.BerekenKosten(request);
            var zetting = result.Kostenposten.Find(k => k.Label == "Zetting");

            Assert.AreEqual(75.00, zetting.Kostprijs, 0.01);
        }

        // -- Laswerk --

        [TestMethod]
        public void BerekenKosten_Laswerk_KloptMetTarief()
        {
            // 60 minuten × tarief 75/uur = 75.00
            var request = MaakRequest(
                operations: new List<BewerkingItemDto>
                {
                    new BewerkingItemDto { Id = "1", Lassen = 60 }
                }
            );

            var result = _service.BerekenKosten(request);
            var laswerk = result.Kostenposten.Find(k => k.Label == "Laswerk");

            Assert.AreEqual(75.00, laswerk.Kostprijs, 0.01);
        }

        // -- Overige bewerkingen --

        [TestMethod]
        public void BerekenKosten_Boren_KloptMetTarief()
        {
            // 60 minuten × tarief 70/uur = 70.00
            var request = MaakRequest(
                operations: new List<BewerkingItemDto>
                {
                    new BewerkingItemDto { Id = "1", BorenTappenGaten = 60 }
                }
            );

            var result = _service.BerekenKosten(request);
            var overig = result.Kostenposten.Find(k => k.Label == "Overige bewerkingen");

            Assert.AreEqual(70.00, overig.Kostprijs, 0.01);
        }

        [TestMethod]
        public void BerekenKosten_Afbramen_KloptMetNormtijdEnTarief()
        {
            // 1 onderdeel × normtijd 2.5 min × tarief 64/uur = 2.67
            var request = MaakRequest(
                operations: new List<BewerkingItemDto>
                {
                    new BewerkingItemDto { Id = "1", Afbramen = true }
                }
            );

            var result = _service.BerekenKosten(request);
            var overig = result.Kostenposten.Find(k => k.Label == "Overige bewerkingen");

            Assert.AreEqual(2.67, overig.Kostprijs, 0.01);
        }

        // -- Externe bewerkingen --

        [TestMethod]
        public void BerekenKosten_PrecisieGaten_KloptMetTarief()
        {
            // 3 precisie gaten × €5.00 = €15.00
            var request = MaakRequest(
                externalOperations: new List<ExterneBewerkingItemDto>
                {
            new ExterneBewerkingItemDto { Id = "1", PrecisieGaten = 3 }
                }
            );

            var result = _service.BerekenKosten(request);
            var overig = result.Kostenposten.Find(k => k.Label == "Externe bewerkingen");

            Assert.AreEqual(15.00, overig.Kostprijs, 0.01);
        }

        [TestMethod]
        public void BerekenKosten_Graveren_KloptMetTarief()
        {
            // 2 graveringen × €8.00 = €16.00
            var request = MaakRequest(
                externalOperations: new List<ExterneBewerkingItemDto>
                {
            new ExterneBewerkingItemDto { Id = "1", Graveren = 2 }
                }
            );

            var result = _service.BerekenKosten(request);
            var overig = result.Kostenposten.Find(k => k.Label == "Externe bewerkingen");

            Assert.AreEqual(16.00, overig.Kostprijs, 0.01);
        }

        // -- Verpakking --

        [TestMethod]
        public void BerekenKosten_Verpakking_KloptMetAantalEnNormtijd()
        {
            // 2 onderdelen × normtijd 3 min × tarief 64/uur = 6.40
            var request = MaakRequest(
                nestingData: new List<NestingItemDto>
                {
                    new NestingItemDto { Id = "1", Aantallen = 2, Gewicht = 0, Lengte = 0, Breedte = 0 }
                }
            );

            var result = _service.BerekenKosten(request);
            var verpakking = result.Kostenposten.Find(k => k.Label == "Verpakking");

            Assert.AreEqual(6.40, verpakking.Kostprijs, 0.01);
        }

        // -- Winst & risico --

        [TestMethod]
        public void BerekenKosten_WinstRisico_Is2ProcentVanSubtotaal()
        {
            var request = MaakRequest(
                operations: new List<BewerkingItemDto>
                {
                    new BewerkingItemDto { Id = "1", Zet1Eman = 60 }
                }
            );

            var result = _service.BerekenKosten(request);
            var winstRisico = result.Kostenposten.Find(k => k.Label == "Winst & risico");
            var subtotaal = result.Totaal - winstRisico.Kostprijs;

            Assert.AreEqual(subtotaal * 0.02, winstRisico.Kostprijs, 0.01);
        }

        // -- Export --

        [TestMethod]
        public void ExportController_LegeVerkoopregels_GeeftBadRequest()
        {
            var controller = new CalculationTool.Controllers.ExportController();
            var request = new ExportRequestDto
            {
                OrderId = 64311,  // was: OrderInfo
                Verkoopregels = new List<VerkoopRegelDto>(),
                Kostenposten = new List<KostenpostDto>(),
                TotaalPrijs = 0,
            };

            var result = controller.Export(request);
            Assert.IsInstanceOfType(result, typeof(System.Web.Http.Results.BadRequestErrorMessageResult));
        }

        [TestMethod]
        public void ExportController_NullRequest_GeeftBadRequest()
        {
            var controller = new CalculationTool.Controllers.ExportController();
            var result = controller.Export(null);

            Assert.IsInstanceOfType(result, typeof(System.Web.Http.Results.BadRequestErrorMessageResult));
        }
    }
}