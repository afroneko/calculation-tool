using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CalculationTool.Models;

namespace CalculationTool.Services
{
    public interface IQuoteService
    {
        QuoteDto GetQuote(string id);
    }
}
