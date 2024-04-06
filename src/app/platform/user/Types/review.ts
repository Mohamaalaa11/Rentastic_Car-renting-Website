import { Car } from './../../../Car';
import { User } from './user';
import { Reservation } from './reservations';

export interface Review {
  ReservationId: number;
  CarId: number;
  UserGuid: string;
  Message: string;
  Rate: number;
}
