import { Review } from "./review";
import { User } from "./user";
import { Car } from "../../../Car";

export interface Reservation {
    Id: number;
    userSsn: number;
    carId: number;
    StartRentTime: Date;
    EndRentDate: Date;
    TotalPrice: number;
    review: Review;
    user: User;
    Car: Car;
}