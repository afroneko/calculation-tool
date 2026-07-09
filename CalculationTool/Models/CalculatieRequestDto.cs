using System.Collections.Generic;

namespace CalculationTool.Models
{
    // de volledige input die de frontend opstuurt
    public class CalculatieRequestDto
    {
        public List<NestingItemDto> NestingData { get; set; }
        public List<MateriaalItemDto> Materials { get; set; }
        public List<BewerkingItemDto> Operations { get; set; }
        public List<ExterneBewerkingItemDto> ExternalOperations { get; set; }
        public List<TariefItemDto> Tarieven { get; set; }
        public List<NormtijdItemDto> Normtijden { get; set; }
    }

    // één rij uit de nestingData (uitgelezen DXF afmetingen)
    public class NestingItemDto
    {
        public string Id { get; set; }
        public string Materiaal { get; set; }
        public string Dikte { get; set; }
        public int Lengte { get; set; }     // in mm
        public int Breedte { get; set; }    // in mm
        public double Gewicht { get; set; } // in kg
        public int Aantallen { get; set; }
        public int Gaten { get; set; }
    }

    // één rij uit materials (materiaalsoort, dikte, aantallen per bestand)
    public class MateriaalItemDto
    {
        public string Id { get; set; }
        public string Naam { get; set; }
        public string Materiaal { get; set; }
        public string Dikte { get; set; }
        public int Aantallen { get; set; }
    }

    // één rij uit operations (bewerkingstijden per bestand)
    public class BewerkingItemDto
    {
        public string Id { get; set; }
        public string Naam { get; set; }
        public int? Zet1Eman { get; set; }
        public int? Zet2Eman { get; set; }
        public int? Walsen { get; set; }
        public int? BorenTappenGaten { get; set; }
        public int? Lassen { get; set; }
        public bool Afbramen { get; set; }
    }

    // één rij uit externalOperations (externe bewerkingen per bestand)
    public class ExterneBewerkingItemDto
    {
        public string Id { get; set; }
        public string Naam { get; set; }
        public bool Zwartcoaten { get; set; }
        public bool Parelcoaten { get; set; }
        public int? PrecisieGaten { get; set; }
        public int? Graveren { get; set; }
    }

    public class TariefItemDto
    {
        public string Label { get; set; }
        public double Rate { get; set; }
    }

    public class NormtijdItemDto
    {
        public string Label { get; set; }
        public double Time { get; set; }
    }
}