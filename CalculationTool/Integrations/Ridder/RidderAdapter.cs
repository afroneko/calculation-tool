using CalculationTool.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace CalculationTool.Integrations.Ridder
{
    public class RidderAdapter : IRidderAdapter
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey = ConfigurationManager.AppSettings["RidderApiKey"];
        private readonly string _apiUrl = ConfigurationManager.AppSettings["RidderApiUrl"];
        private readonly string _tmsApiUrl = ConfigurationManager.AppSettings["TmsApiUrl"];

        public RidderAdapter()
        {
            _httpClient = new HttpClient();
            System.Diagnostics.Debug.WriteLine($"API URL = '{_apiUrl}'");
            System.Diagnostics.Debug.WriteLine($"API KEY = '{_apiKey}'");
            _httpClient.DefaultRequestHeaders.Add("X-Api-Key", _apiKey);
        }

       

        public QuoteDto GetQuote(string id)
        {
            var url = $"{_apiUrl.TrimEnd('/')}/order/{id}";
            System.Diagnostics.Debug.WriteLine($"REQUEST URL: {url}");
            var response = _httpClient.GetAsync(url).Result;
            var json = response.Content.ReadAsStringAsync().Result;
            //var text = JsonConvert.DeserializeObject<string>(json);
            System.Diagnostics.Debug.WriteLine($"RAW JSON: {json}");

            System.Diagnostics.Debug.WriteLine("STATUS RIDDER:");
            System.Diagnostics.Debug.WriteLine(response.StatusCode);

            System.Diagnostics.Debug.WriteLine("BODY RIDDER:");
            System.Diagnostics.Debug.WriteLine(json);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Ridder API error: {response.StatusCode} - {json}");
            }
            var ridderData = JsonConvert.DeserializeObject<RidderOrderResponse>(json);

            return new QuoteDto
            {
                QuoteNumber = ridderData.Order.OrderNumber.ToString(),
                Customer = ridderData.Relation.RelationName,
                Salesperson = ridderData.Order.SalesPerson,
                CreatedAt = DateTime.Parse(ridderData.Order.DateCreated.ToString()).ToString("dd-MM-yyyy"),
            };
        }

        public MateriaalDetailDto GetMateriaalDetail(int artikelgroepId, string zoekcode, int dikte)
        {
            var url = $"{_apiUrl.TrimEnd('/')}/material/{artikelgroepId}/{Uri.EscapeDataString(zoekcode)}/{dikte}";
            System.Diagnostics.Debug.WriteLine($"REQUEST URL: {url}");
            var response = _httpClient.GetAsync(url).Result;
            var json = response.Content.ReadAsStringAsync().Result;

            System.Diagnostics.Debug.WriteLine($"RAW JSON: {json}");

            System.Diagnostics.Debug.WriteLine("STATUS RIDDER:");
            System.Diagnostics.Debug.WriteLine(response.StatusCode);

            System.Diagnostics.Debug.WriteLine("BODY RIDDER:");
            System.Diagnostics.Debug.WriteLine(json);

            if (!response.IsSuccessStatusCode)
                throw new Exception($"Ridder API error: {response.StatusCode} - {json}");

            var data = JsonConvert.DeserializeObject<dynamic>(json);

            return new MateriaalDetailDto
            {
                Id          = data.PK_R_ITEM,
                Naam        = data.DESCRIPTION,
                PrijsPerKg  = data.STANDARDPURCHASEPRICE,
                Dikte       = data.THICKNESS,
                Gewicht     = data.WEIGHT,
            };
        }

        public RidderLoginResponseDto Login(string gebruikersnaam, string wachtwoord)
        {
            var url = $"{_tmsApiUrl.TrimEnd('/')}/TMS/login/{gebruikersnaam}/{wachtwoord}";
            System.Diagnostics.Debug.WriteLine($"REQUEST URL: {url}");
            var response = _httpClient.GetAsync(url).Result;
            var json = response.Content.ReadAsStringAsync().Result;

            System.Diagnostics.Debug.WriteLine($"RAW JSON: {json}");

            System.Diagnostics.Debug.WriteLine("STATUS RIDDER:");
            System.Diagnostics.Debug.WriteLine(response.StatusCode);

            System.Diagnostics.Debug.WriteLine("BODY RIDDER:");
            System.Diagnostics.Debug.WriteLine(json);

            if (!response.IsSuccessStatusCode)
                return null;

            var data = JsonConvert.DeserializeObject<dynamic>(json);

            return new RidderLoginResponseDto
            {
                GebruikerID = (int)data.GebruikerID,
                Gebruikersnaam = data.Gebruikersnaam.ToString().Trim(),
            };
        }
    }
}