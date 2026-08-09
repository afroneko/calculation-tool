using CalculationTool.Models;

namespace CalculationTool.Services
{
    public interface ICalculatieService
    {
        CalculatieResultDto BerekenKosten(CalculatieRequestDto request);
    }
}
