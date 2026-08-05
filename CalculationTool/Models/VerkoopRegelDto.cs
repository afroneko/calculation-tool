using System.Collections.Generic;

namespace CalculationTool.Models
{
    public class ExportRequestDto
    {
        public OrderInfoDto OrderInfo { get; set; }
        public List<VerkoopRegelDto> Verkoopregels { get; set; }
        public List<KostenpostDto> Kostenposten { get; set; }
        public double TotaalPrijs { get; set; }
    }

    public class OrderInfoDto
    {
        public string OrderNummer { get; set; }
        public string Klant { get; set; }
        public string Verkoper { get; set; }
        public string AangemaaktOp { get; set; }
    }

    public class VerkoopRegelDto
    {
        // DXF gegevens
        public string DxfNaam { get; set; }
        public int Materiaalnr { get; set; }        // voor Wicam
        public string MateriaalOmschrijving { get; set; }
        public string Dikte { get; set; }
        public int Aantallen { get; set; }
        public double Oppervlakte { get; set; }     // in m²
        public double Gewicht { get; set; }         // in kg
        public int Gaten { get; set; }

        // Bewerkingen
        public int? Zet1Eman { get; set; }
        public int? Zet2Eman { get; set; }
        public int? Walsen { get; set; }
        public int? BorenTappenGaten { get; set; }
        public int? Lassen { get; set; }
        public bool Afbramen { get; set; }

        // Externe bewerkingen
        public bool Zwartcoaten { get; set; }
        public bool Parelcoaten { get; set; }
        public int? PrecisieGaten { get; set; }
        public int? Graveren { get; set; }
    }
}