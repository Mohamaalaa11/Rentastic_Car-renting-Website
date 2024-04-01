import { Review } from "./review";
import { User } from "./user";
import { Car } from "../../../Car";

export interface Reservation {
    id: number;
    userSsn: number;
    carId: number;
    startRentTime: string;
    endRentDate: string;
    totalPrice: number;
    review: Review;
    user: User;
    car: Car;
}