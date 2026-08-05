using CalculationTool.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace CalculationTool.Controllers
{
    [RoutePrefix("api/export")]
    public class ExportController : ApiController
    {
        [HttpPost, Route("")]
        public IHttpActionResult Export([FromBody] ExportRequestDto request)
        {
            if (request == null)
                return BadRequest("Request mag niet leeg zijn");

            // hier komt later de Ridder API call
            // voor nu alleen valideren en bevestigen
            if (request.Verkoopregels == null || request.Verkoopregels.Count == 0)
                return BadRequest("Geen verkoopregels gevonden");

            return Ok(new { Succes = true, Bericht = "Export succesvol ontvangen" });
        }
    }
}