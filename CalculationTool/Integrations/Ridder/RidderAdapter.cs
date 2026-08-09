using CalculationTool.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Web;
using BC = BCrypt.Net.BCrypt;

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
            System.Diagnostics.Debug.WriteLine(
    $"RIDDER ORDER ID: {ridderData.Order.OrderId}"
);

            System.Diagnostics.Debug.WriteLine(
                $"RIDDER ORDER NUMBER: {ridderData.Order.OrderNumber}"
            );

            return new QuoteDto
            {
                OrderId = ridderData.Order.OrderId,
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
            var url = $"{_tmsApiUrl}/TMS/login/{gebruikersnaam}/{Uri.EscapeDataString(wachtwoord)}";
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

            var data = JsonConvert.DeserializeObject<RidderLoginResponseDto>(json);

            //if (data == null || string.IsNullOrEmpty(data.WachtwoordHash))
            //    return null;

            //if (!BCrypt.Net.BCrypt.Verify(wachtwoord, data.WachtwoordHash))
            //    return null;

            return new RidderLoginResponseDto
            {
                GebruikerID = (int)data.GebruikerID,
                Gebruikersnaam = data.Gebruikersnaam.ToString().Trim(),
            };
        }

        public RegistratieResultDto RegistreerGebruiker(string gebruikersnaam, string wachtwoord)
        {
            var wachtwoordHash = BC.HashPassword(wachtwoord);
            System.Diagnostics.Debug.WriteLine($"Password: {wachtwoord}");
            var url = $"{_tmsApiUrl}/TMS/login";
            var body = new StringContent(
                JsonConvert.SerializeObject(new
                {
                    Gebruikersnaam = gebruikersnaam,
                    WachtwoordHash = wachtwoordHash,
                }),
                System.Text.Encoding.UTF8,
                "application/json"
            );

            var response = _httpClient.PostAsync(url, body).Result;
            var json = response.Content.ReadAsStringAsync().Result;

            System.Diagnostics.Debug.WriteLine($"REGISTRATIE URL: {url}");
            System.Diagnostics.Debug.WriteLine($"REGISTRATIE STATUS: {response.StatusCode}");
            System.Diagnostics.Debug.WriteLine($"REGISTRATIE BODY: {json}");

            return new RegistratieResultDto { Succes = response.IsSuccessStatusCode };
        }

        public bool ExporteerNaarRidder(ExportRequestDto request, int OrderId)
        {
            // TODO: vervang door echte Ridder endpoint zodra beschikbaar
            var url = $"{_apiUrl.TrimEnd('/')}/order/export/{OrderId}";

            var body = new StringContent(
                JsonConvert.SerializeObject(request.Verkoopregels),
                System.Text.Encoding.UTF8,
                "application/json"
            );

            System.Diagnostics.Debug.WriteLine($"EXPORT BODY: {JsonConvert.SerializeObject(request.Verkoopregels)}");

            var response = _httpClient.PostAsync(url, body).Result;
            var responseBody = response.Content.ReadAsStringAsync().Result;

            System.Diagnostics.Debug.WriteLine($"EXPORT URL: {url}");
            System.Diagnostics.Debug.WriteLine($"EXPORT STATUS: {response.StatusCode}");
            System.Diagnostics.Debug.WriteLine($"EXPORT RESPONSE: {responseBody}");

            return response.IsSuccessStatusCode;
        }

    }
}