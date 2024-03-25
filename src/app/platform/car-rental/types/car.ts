export class Car {
  id: number;
  name: string;
  brand: string;
  modelYear: string;
  description: string;
  color: string;
  category: string;
  seatCount: number;
  pricePerDay: number;
  images: string;
  hasAirCondition: boolean;

  isAutomatic: boolean;

  constructor(
    id: number,
    name: string,
    brand: string,
    modelYear: string,
    description: string,
    color: string,
    category: string,
    seatCount: number,
    pricePerDay: number,
    images: string,
    hasAirCondition: boolean,
    isAutomatic: boolean
  ) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.modelYear = modelYear;
    this.description = description;
    this.color = color;
    this.category = category;
    this.seatCount = seatCount;
    this.pricePerDay = pricePerDay;
    this.images = images;
    this.hasAirCondition = hasAirCondition;

    this.isAutomatic = isAutomatic;
  }
}
