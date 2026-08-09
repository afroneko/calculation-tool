using CalculationTool.Integrations.Ridder;
using CalculationTool.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace CalculationTool.Controllers
{
    [RoutePrefix("api/export")]
    public class ExportController : ApiController
    {
        private readonly IRidderAdapter _ridderAdapter;

        public ExportController()
        {
            _ridderAdapter = new RidderAdapter();
        }

        [HttpPost, Route("")]
        public IHttpActionResult Export([FromBody] ExportRequestDto request)
        {
            if (request == null)
                return BadRequest("Request mag niet leeg zijn");

            if (request.Verkoopregels == null || request.Verkoopregels.Count == 0)
                return BadRequest("Geen verkoopregels gevonden");

            System.Diagnostics.Debug.WriteLine($"REQUEST ORDER ID: {request.OrderId}");
            System.Diagnostics.Debug.WriteLine($"AANTAL VERKOOPREGELS: {request.Verkoopregels.Count}");

            var succes = _ridderAdapter.ExporteerNaarRidder(request, request.OrderId);

            if (!succes)
                return InternalServerError(new System.Exception("Export naar Ridder mislukt"));

            return Ok(new { Succes = true, Bericht = "Export succesvol verstuurd naar Ridder" });
        }
    }
}