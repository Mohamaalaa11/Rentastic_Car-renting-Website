import { Car } from "./Car";

export class Reservation{
    car:Car;
    customerId:number;
    startDate:Date;
    endDate:Date;
    totalPrice:number;

    constructor(car:Car,customerId:number,startDate:Date,endDate:Date,totalPrice:number) {
        this.car=car;
        this.customerId=customerId;
        this.startDate=startDate;
        this.endDate=endDate;
        this.totalPrice=totalPrice;
        
    }
}