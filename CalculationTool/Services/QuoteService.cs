using CalculationTool.Integrations.Ridder;
using CalculationTool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CalculationTool.Services
{
    public class QuoteService : IQuoteService
    {
        private readonly IRidderAdapter _ridderAdapter;

        public QuoteService(IRidderAdapter ridderAdapter)
        {
            _ridderAdapter = ridderAdapter;
        }

        public QuoteDto GetQuote(string id)
        {
            return _ridderAdapter.GetQuote(id);
        }
    }
}