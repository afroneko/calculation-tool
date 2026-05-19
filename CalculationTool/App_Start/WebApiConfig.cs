using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CalculationTool
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //CORS inschakelen
            var cors = new EnableCorsAttribute(
            "http://localhost:5173", //react dev server
            "*",
            "*"
        );

            config.EnableCors(cors);

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
