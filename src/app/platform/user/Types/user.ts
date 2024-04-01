import { Reservation } from "./reservations";
import { Review } from "./review";

export class User {
    Ssn: number=0;
    Name: string ='';
    Password: string='' ;
    Email: string='';
    PhoneNumber: string='';
    Address: string ='';
    Image: string ='';
    IsAdmin: boolean=false;
    NationalIdentityNumber: string='';
    Reservations: Reservation[]=[];
    Reviews: Review[]=[];
}