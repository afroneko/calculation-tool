namespace CalculationTool.Models
{
    public class LoginRequestDto
    {
        public string Gebruikersnaam { get; set; }
        public string Wachtwoord { get; set; }
    }

    public class LoginResultDto
    {
        public bool Succes { get; set; }
        public string Foutmelding { get; set; }
    }
}