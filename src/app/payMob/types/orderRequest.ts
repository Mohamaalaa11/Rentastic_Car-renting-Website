export interface Order {
  auth_token: string;
  amount_cents: string;
  currency: string;
  delivery_needed: string;
  items: [];
}
