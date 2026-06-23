using CalculationTool.Integrations.Ridder;
using CalculationTool.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CalculationTool.Controllers
{
    [RoutePrefix("api/quotes")]
    public class QuoteController : ApiController
    {
        private readonly IQuoteService _quoteService;

        public QuoteController()
        {
            _quoteService = new QuoteService(new RidderAdapter());
        }


        [HttpGet, Route("{id}")]
        public IHttpActionResult GetQuote(string id)
        {
            var quote = _quoteService.GetQuote(id);
            return Ok(quote);
        }
    }
}