using CalculationTool.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace CalculationTool.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        // hardcoded gebruikers, later vervangen door database
        private static readonly Dictionary<string, string> _gebruikers = new Dictionary<string, string>
        {
            { "admin", "Admin123!" },
            { "lisa",  "Welkom01!" },
        };

        // bijhouden van mislukte pogingen per gebruikersnaam
        private static readonly Dictionary<string, (int Pogingen, DateTime LaatstePoging)> _pogingen
            = new Dictionary<string, (int, DateTime)>();

        private const int MaxPogingen = 5;
        private const int TimeoutMinuten = 5;

        [HttpPost, Route("login")]
        public IHttpActionResult Login([FromBody] LoginRequestDto request)
        {
            if (request == null || string.IsNullOrEmpty(request.Gebruikersnaam))
                return BadRequest("Gebruikersnaam en wachtwoord zijn verplicht");

            var gebruikersnaam = request.Gebruikersnaam.ToLower();

            // check timeout
            if (_pogingen.ContainsKey(gebruikersnaam))
            {
                var (pogingen, laatste) = _pogingen[gebruikersnaam];
                if (pogingen >= MaxPogingen && DateTime.Now - laatste < TimeSpan.FromMinutes(TimeoutMinuten))
                {
                    var wachten = Math.Ceiling((TimeSpan.FromMinutes(TimeoutMinuten) - (DateTime.Now - laatste)).TotalSeconds);
                    return Ok(new LoginResultDto
                    {
                        Succes = false,
                        Foutmelding = $"Te veel mislukte pogingen. Probeer het over {wachten} seconden opnieuw."
                    });
                }

                // timeout voorbij, reset pogingen
                if (DateTime.Now - laatste >= TimeSpan.FromMinutes(TimeoutMinuten))
                    _pogingen.Remove(gebruikersnaam);
            }

            // check gebruikersnaam en wachtwoord
            if (!_gebruikers.ContainsKey(gebruikersnaam) || _gebruikers[gebruikersnaam] != request.Wachtwoord)
            {
                if (!_pogingen.ContainsKey(gebruikersnaam))
                    _pogingen[gebruikersnaam] = (1, DateTime.Now);
                else
                {
                    var (pogingen, _) = _pogingen[gebruikersnaam];
                    _pogingen[gebruikersnaam] = (pogingen + 1, DateTime.Now);
                }

                var over = MaxPogingen - _pogingen[gebruikersnaam].Pogingen;
                return Ok(new LoginResultDto
                {
                    Succes = false,
                    Foutmelding = over > 0
                        ? $"Gebruikersnaam of wachtwoord onjuist. Nog {over} pogingen voor timeout."
                        : $"Te veel mislukte pogingen. Wacht {TimeoutMinuten} minuten."
                });
            }

            // succesvol ingelogd, reset pogingen
            _pogingen.Remove(gebruikersnaam);

            return Ok(new LoginResultDto { Succes = true });
        }
    }
}