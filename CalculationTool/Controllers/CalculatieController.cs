using CalculationTool.Integrations.Ridder;
using CalculationTool.Models;
using CalculationTool.Services;
using System.Web.Http;

[RoutePrefix("api/calculatie")]
public class CalculatieController : ApiController
{
    private readonly ICalculatieService _calculatieService;

    public CalculatieController()
    {
        _calculatieService = new CalculatieService(new RidderAdapter());
    }

    [HttpPost, Route("")]
    public IHttpActionResult BerekenKosten([FromBody] CalculatieRequestDto request)
    {
        if (request == null)
            return BadRequest("Request mag niet leeg zijn");

        var result = _calculatieService.BerekenKosten(request);
        return Ok(result);
    }
}