import { Car } from "./../../../Car";
import { User } from "./user";
import { Reservation } from "./reservations";

export interface Review {
    reservationId: number;
    carId: number;
    userSsn: number;
    message: string;
    rate: number;
    car: Car;
    user: User;
    reservation: Reservation;
}