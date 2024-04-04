import { Car } from "../../../Car";
import { Reservation } from "./reservations";
import { Review } from "./review";

export interface User {
    Ssn: number;
    Name: string;
    Password: string ;
    Email: string;
    PhoneNumber: string;
    Address: string ;
    Image: string ;
    IsAdmin: boolean;
    NationalIdentityNumber: string;
    Reservations: Reservation[];
    Reviews: Review[];
}