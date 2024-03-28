export class Car {
  Id: number;
  Name: string;
  Brand: string;
  ModelYear: string;
  Description: string;
  Color: string;
  Category: string;
  SeatCount: number;
  PricePerDay: number;
  Images: string;
  HasAirCondition: boolean;
  IsAutomatic: boolean;

  constructor(
    id: number,
    name: string,
    brand: string,
    ModelYear: string,
    description: string,
    color: string,
    category: string,
    seatCount: number,
    pricePerDay: number,
    images: string,
    hasAirCondition: boolean,
    isAutomatic: boolean
  ) {
    this.Id = id;
    this.Name = name;
    this.Brand = brand;
    this.ModelYear = ModelYear;
    this.Description = description;
    this.Color = color;
    this.Category = category;
    this.SeatCount = seatCount;
    this.PricePerDay = pricePerDay;
    this.Images = images;
    this.HasAirCondition = hasAirCondition;
    this.IsAutomatic = isAutomatic;
  }
}
