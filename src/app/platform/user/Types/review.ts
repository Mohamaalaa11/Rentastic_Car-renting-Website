import { Car } from "./../../../Car";
import { User } from "./user";
import { Reservation } from "./reservations";

export interface Review {
    reservationId: number;
    carId: number;
    userGuid: string;
    message: string;
    rate: number;
}