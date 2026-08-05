using CalculationTool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalculationTool.Integrations.Ridder
{
    
    public interface IRidderAdapter
    {
        QuoteDto GetQuote(string id);
        MateriaalDetailDto GetMateriaalDetail(int id, string beschrijving, int dikte);
        RidderLoginResponseDto Login(string gebruikersnaam, string wachtwoord);
        RegistratieResultDto RegistreerGebruiker(string gebruikersnaam, string wachtwoord);
        bool ExporteerNaarRidder(ExportRequestDto request);
    }
}
