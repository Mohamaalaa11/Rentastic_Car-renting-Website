export class Car {
  Id: number;
  Name: string;
  Brand: string;
  ModelYear: string;
  Description:string;
  Color: string;
  Category: string;
  SeatCount: number;
  PricePerDay: number;
  Images: string;
  HasAirCondition:boolean;
  
  IsAutomatic : boolean ;
  

  constructor(
    Id: number,
    Name: string,
    Brand: string,
    ModelYear: string,
    Description:string,
    Color: string,
    Category: string,
    SeatCount: number,
    PricePerDay: number,
    Images: string,
    HasAirCondition:boolean,
    IsAutomatic : boolean,
   
   
  ) {
    this.Id = Id;
    this.Name = Name;
    this.Brand = Brand;
    this.ModelYear = ModelYear;
    this.Description=Description;
    this.Color = Color;
    this.Category = Category;
    this.SeatCount = SeatCount;
    this.PricePerDay = PricePerDay;
    this.Images = Images;
    this.HasAirCondition=HasAirCondition;
   
    this.IsAutomatic =IsAutomatic
   
  }
}