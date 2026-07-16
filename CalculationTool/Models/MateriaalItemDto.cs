namespace CalculationTool.Models
{
    public class MateriaalItemDto
    {
        public string Id { get; set; }
        public string Naam { get; set; }
        public int? MateriaalId { get; set; }
        public int? ArtikelgroepId { get; set; }
        public string ZoekCode { get; set; }
        public string Dikte { get; set; }
        public int Aantallen { get; set; }
    }

}

