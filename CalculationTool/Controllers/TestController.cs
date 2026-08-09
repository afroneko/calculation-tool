using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace CalculationTool.Controllers

{
    public class TestController : ApiController
    {
        [HttpGet]
        [Route("api/test")]
        public IHttpActionResult Get()
        {
            return Ok(new {message = "backend werkt!"});
        }
    }
}