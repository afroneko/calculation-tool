// hulpklassen voor de Ridder JSON structuur
using System;

public class RidderOrderResponse
{
    public RidderOrder Order { get; set; }
    public RidderRelation Relation { get; set; }
}

public class RidderOrder
{
    public int OrderNumber { get; set; }

    public string SalesPerson { get; set; }
    public DateTime DateCreated { get; set; }

}

public class RidderRelation
{
    public string RelationName { get; set; }
}