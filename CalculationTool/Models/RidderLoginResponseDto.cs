namespace CalculationTool.Models
{
    public class RidderLoginResponseDto
    {
        public int GebruikerID { get; set; }
        public string Gebruikersnaam { get; set; }
        public string WachtwoordHash { get; set; }
    }
}