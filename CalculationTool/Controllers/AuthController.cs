using CalculationTool.Integrations.Ridder;
using CalculationTool.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace CalculationTool.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private readonly IRidderAdapter _ridderAdapter;

        private static readonly Dictionary<string, (int Pogingen, DateTime LaatstePoging)> _pogingen
            = new Dictionary<string, (int, DateTime)>();

        private const int MaxPogingen = 5;
        private const int TimeoutMinuten = 5;

        public AuthController()
        {
            _ridderAdapter = new RidderAdapter();
        }

        [HttpPost, Route("login")]
        public IHttpActionResult Login([FromBody] LoginRequestDto request)
        {
            if (request == null || string.IsNullOrEmpty(request.Gebruikersnaam))
                return BadRequest("Gebruikersnaam en wachtwoord zijn verplicht");

            var gebruikersnaam = request.Gebruikersnaam.ToLower().Trim();

            // check timeout
            if (_pogingen.ContainsKey(gebruikersnaam))
            {
                var (pogingen, laatste) = _pogingen[gebruikersnaam];
                if (pogingen >= MaxPogingen && DateTime.Now - laatste < TimeSpan.FromMinutes(TimeoutMinuten))
                {
                    var wachten = Math.Ceiling(
                        (TimeSpan.FromMinutes(TimeoutMinuten) - (DateTime.Now - laatste)).TotalSeconds
                    );
                    return Ok(new LoginResultDto
                    {
                        Succes = false,
                        Foutmelding = $"Te veel mislukte pogingen. Probeer het over {wachten} seconden opnieuw."
                    });
                }

                if (DateTime.Now - laatste >= TimeSpan.FromMinutes(TimeoutMinuten))
                    _pogingen.Remove(gebruikersnaam);
            }

            // login via Ridder API
            var gebruiker = _ridderAdapter.Login(request.Gebruikersnaam, request.Wachtwoord);

            if (gebruiker == null)
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

            _pogingen.Remove(gebruikersnaam);
            return Ok(new LoginResultDto { Succes = true });
        }
    }
}