import { Car } from './car';

export interface OrderData {
  auth_token: string;
  amount_cents: string;
  currency: string;
  delivery_needed: string;
  items: [{}];
}
