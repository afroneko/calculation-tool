namespace CalculationTool.Models
{
    // één kostenpost zoals weergegeven op het Kostenoverzicht
    public class KostenpostDto
    {
        public string Label { get; set; }
        public string Sublabel { get; set; }
        public string Icon { get; set; }
        public double Kostprijs { get; set; }
        public string Toelichting { get; set; }
    }
}