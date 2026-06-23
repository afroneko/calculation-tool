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
    }
}
