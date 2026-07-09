using System;
using System.Collections.Generic;
using System.Linq;
using CalculationTool.Integrations.Ridder;
using CalculationTool.Models;

namespace CalculationTool.Services
{
    public class CalculatieService : ICalculatieService
    {
        private readonly IRidderAdapter _ridderAdapter;

        public CalculatieService(IRidderAdapter ridderAdapter)
        {
            _ridderAdapter = ridderAdapter;
        }

        public CalculatieResultDto BerekenKosten(CalculatieRequestDto request)
        {
            // haal tarieven en normtijden op uit Ridder
            // voorlopig placeholder totdat de Ridder integratie klaar is
            var tarieven = request.Tarieven.ToDictionary(t => t.Label, t => t.Rate);
            var normtijden = request.Normtijden.ToDictionary(n => n.Label, n => n.Time);

            var kostenposten = new List<KostenpostDto>();

            // -- Materiaal --
            double materiaalKosten = request.NestingData.Sum(n =>
            {
                // prijs per kg op basis van materiaalsoort, later uit Ridder
                double prijsPerKg = GetPrijsPerKg(n.Materiaal);
                return n.Gewicht * n.Aantallen * prijsPerKg;
            });

            var gebruikteMaterialen = request.NestingData
                .Select(n => n.Materiaal)
                .Distinct()
                .ToList();

            kostenposten.Add(new KostenpostDto
            {
                Label = "Materiaal",
                Sublabel = string.Join(", ", gebruikteMaterialen) + " | Diverse diktes",
                Icon = "pepicons-pencil:file",
                Kostprijs = Math.Round(materiaalKosten, 2),
                Toelichting = "Gebaseerd op nesting en materiaalkosten",
            });

            // -- Snijtijd --
            double totaleOppervlakteM2 = request.NestingData
                .Sum(n => (n.Lengte / 1000.0) * (n.Breedte / 1000.0) * n.Aantallen);
            double snijMinutenPerM2 = 15; // placeholder
            double totaleSnijMinuten = totaleOppervlakteM2 * snijMinutenPerM2;
            double snijtijdKosten = totaleSnijMinuten * GetTarief(tarieven, "Lasersnijden");

            kostenposten.Add(new KostenpostDto
            {
                Label = "Snijtijd",
                Sublabel = "Lasersnijden",
                Icon = "iconamoon:clock-light",
                Kostprijs = Math.Round(snijtijdKosten, 2),
                Toelichting = $"Totale snijtijd: {Math.Floor(totaleSnijMinuten / 60)}u {Math.Round(totaleSnijMinuten % 60)}m",
            });

            // -- Zetting --
            int zet1Minuten = request.Operations.Sum(o => o.Zet1Eman ?? 0);
            int zet2Minuten = request.Operations.Sum(o => o.Zet2Eman ?? 0);
            double zettingKosten =
                (zet1Minuten / 60.0) * GetTarief(tarieven, "Zetwerk machine + 1e man") +
                (zet2Minuten / 60.0) * GetTarief(tarieven, "Plaatwerk 2e man");

            kostenposten.Add(new KostenpostDto
            {
                Label = "Zetting",
                Sublabel = "Kantbewerkingen",
                Icon = "material-symbols-light:devices-fold-outline",
                Kostprijs = Math.Round(zettingKosten, 2),
                Toelichting = $"Totaal {zet1Minuten + zet2Minuten} zettingen",
            });

            // -- Laswerk --
            int lasMinuten = request.Operations.Sum(o => o.Lassen ?? 0);
            double laswerkKosten = (lasMinuten / 60.0) * GetTarief(tarieven, "Zaagwerk/lassen/beitsen/schuren");

            kostenposten.Add(new KostenpostDto
            {
                Label = "Laswerk",
                Sublabel = "Lasmeters en -tijd",
                Icon = "pepicons-pencil:square-off",
                Kostprijs = Math.Round(laswerkKosten, 2),
                Toelichting = $"Totaal {lasMinuten} lasminuten",
            });

            // -- Overige bewerkingen --
            int borenMinuten = request.Operations.Sum(o => o.BorenTappenGaten ?? 0);
            int walsenMinuten = request.Operations.Sum(o => o.Walsen ?? 0);
            int afbraamenAantal = request.Operations.Count(o => o.Afbramen);
            double afbraamenMinuten = afbraamenAantal * GetNormtijd(normtijden, "Afbramen");

            double overigeKosten =
                (borenMinuten / 60.0) * GetTarief(tarieven, "Boren/tappen/gaten verzinken") +
                (walsenMinuten / 60.0) * GetTarief(tarieven, "Walsen") +
                (afbraamenMinuten / 60.0) * GetTarief(tarieven, "Uitbreken/afbramen/trommelontbramen");

            kostenposten.Add(new KostenpostDto
            {
                Label = "Overige bewerkingen",
                Sublabel = "boren, tappen, gaten, walsen",
                Icon = "fluent:person-wrench-20-regular",
                Kostprijs = Math.Round(overigeKosten, 2),
                Toelichting = "Inclusief uitbreken en afbramen",
            });

            // -- Externe bewerkingen --
            int precisieGaten = request.ExternalOperations.Sum(o => o.PrecisieGaten ?? 0);
            int graveren = request.ExternalOperations.Sum(o => o.Graveren ?? 0);
            bool zwartcoaten = request.ExternalOperations.Any(o => o.Zwartcoaten);
            bool parelcoaten = request.ExternalOperations.Any(o => o.Parelcoaten);

            // placeholder tarieven, later uit Ridder
            double externeKosten =
                precisieGaten * 5.0 +
                graveren * 8.0 +
                (zwartcoaten ? materiaalKosten * 0.15 : 0) +
                (parelcoaten ? materiaalKosten * 0.20 : 0);

            kostenposten.Add(new KostenpostDto
            {
                Label = "Externe bewerkingen",
                Sublabel = "zwartcoaten, parelcoaten, precisie gaten, graveren",
                Icon = "hugeicons:package-receive",
                Kostprijs = Math.Round(externeKosten, 2),
                Toelichting = $"{precisieGaten} precisie gaten, {graveren} graveringen",
            });

            // -- Verpakking --
            int aantalOnderdelen = request.NestingData.Sum(n => n.Aantallen);
            double verpakkingMinuten = aantalOnderdelen * GetNormtijd(normtijden, "Verpakken");
            double verpakkingKosten = (verpakkingMinuten / 60.0) * GetTarief(tarieven, "Verpakken");

            kostenposten.Add(new KostenpostDto
            {
                Label = "Verpakking",
                Sublabel = "Verpakken en afhandelen",
                Icon = "hugeicons:package-receive",
                Kostprijs = Math.Round(verpakkingKosten, 2),
                Toelichting = $"{aantalOnderdelen} onderdelen",
            });

            // -- Algemene kosten --
            double wvbKosten = (totaleSnijMinuten / 60.0) * GetTarief(tarieven, "W.v.b");

            kostenposten.Add(new KostenpostDto
            {
                Label = "Algemene kosten",
                Sublabel = "WVB, Opslag inkoop en magazijn, transport",
                Icon = "vaadin:euro",
                Kostprijs = Math.Round(wvbKosten, 2),
                Toelichting = "Bedrijfskosten",
            });

            // -- Winst & risico --
            double subtotaal = kostenposten.Sum(k => k.Kostprijs);
            double winstRisicoKosten = subtotaal * 0.02;

            kostenposten.Add(new KostenpostDto
            {
                Label = "Winst & risico",
                Sublabel = "Marge",
                Icon = "ant-design:stock-outlined",
                Kostprijs = Math.Round(winstRisicoKosten, 2),
                Toelichting = "Inschatting risico en marge (2%)",
            });

            double totaal = kostenposten.Sum(k => k.Kostprijs);

            return new CalculatieResultDto
            {
                Kostenposten = kostenposten,
                Totaal = Math.Round(totaal, 2),
            };
        }

        // ----------------------------------------
        // Hulpfuncties
        // ----------------------------------------

        private double GetTarief(Dictionary<string, double> tarieven, string label)
        {
            return tarieven.TryGetValue(label, out double tarief) ? tarief : 0;
        }

        private double GetNormtijd(Dictionary<string, double> normtijden, string label)
        {
            return normtijden.TryGetValue(label, out double tijd) ? tijd : 0;
        }

        // placeholder totdat Ridder integratie klaar is
        private double GetPrijsPerKg(string materiaal)
        {
            var prijzen = new Dictionary<string, double>
            {
                { "RVS304 zf",  3.20 },
                { "RVS316 wgw", 4.10 },
                { "RVS316 zf",  4.05 },
                { "S235",       0.85 },
                { "S355",       0.90 },
            };
            return prijzen.TryGetValue(materiaal, out double prijs) ? prijs : 3.0;
        }

        // placeholder tarieven totdat Ridder integratie klaar is
        private Dictionary<string, double> GetPlaceholderTarieven()
        {
            return new Dictionary<string, double>
            {
                { "Lasersnijden",                        2.63  },
                { "W.v.b",                               91.00 },
                { "Zetwerk machine + 1e man",            85.00 },
                { "Plaatwerk 2e man",                    75.00 },
                { "Zaagwerk/lassen/beitsen/schuren",     75.00 },
                { "Boren/tappen/gaten verzinken",        70.00 },
                { "Uitbreken/afbramen/trommelontbramen", 64.00 },
                { "Walsen",                              136.50 },
                { "Verpakken",                           64.00 },
            };
        }

        // placeholder normtijden totdat Ridder integratie klaar is
        private Dictionary<string, double> GetNormtijden()
        {
            return new Dictionary<string, double>
            {
                { "Zetting 1e man", 3.5 },
                { "Zetting 2e man", 2.0 },
                { "Laswerk",        8.0 },
                { "Boren",          1.5 },
                { "Tappen",         2.0 },
                { "Verzinken",      1.0 },
                { "Walsen",         4.0 },
                { "Afbramen",       2.5 },
                { "Verpakken",      3.0 },
            };
        }

        // fix: GetNormtijden was verkeerd aangeroepen, deze wrapper lost dat op
        private Dictionary<string, double> GetPlaceholderNormtijden() => GetNormtijden();
    }
}