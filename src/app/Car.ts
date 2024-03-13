export class Car {
    id: number;
    name: string;
    brand: string;
    modelYear: string;
    color: string;
    category: string;
    seatCount: number;
    pricePerDay: number;
    image: string;
    isCondition:boolean;
    gear:string;
  
    constructor(
      id: number,
      name: string,
      brand: string,
      modelYear: string,
      color: string,
      category: string,
      seatCount: number,
      pricePerDay: number,
      image: string,
      isCondition:boolean,
      gear:string
    ) {
      this.id = id;
      this.name = name;
      this.brand = brand;
      this.modelYear = modelYear;
      this.color = color;
      this.category = category;
      this.seatCount = seatCount;
      this.pricePerDay = pricePerDay;
      this.image = image;
      this.isCondition=isCondition;
      this.gear=gear;
    }
  }