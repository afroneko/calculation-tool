namespace CalculationTool.Models
{
    public class RegistratieRequestDto
    {
        public string Gebruikersnaam { get; set; }
        public string WachtwoordHash { get; set; }
    }

    public class RegistratieResultDto
    {
        public bool Succes { get; set; }
        public string Foutmelding { get; set; }
    }
}