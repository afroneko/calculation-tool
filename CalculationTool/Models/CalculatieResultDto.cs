using System.Collections.Generic;

namespace CalculationTool.Models
{
    // de volledige output die de backend teruggeeft
    public class CalculatieResultDto
    {
        public List<KostenpostDto> Kostenposten { get; set; }
        public double Totaal { get; set; }
    }
}