export interface PaymentData {
  auth_token: string;
  amount_cents: string;
  expiration: number;
  order_id: string;
  billing_data: {
    apartment: string;
    email: string;
    floor: string;
    first_name: string;
    street: string;
    building: string;
    phone_number: string;
    shipping_method: string;
    postal_code: string;
    city: string;
    country: string;
    last_name: string;
    state: string;
  };
  currency: string;
  integration_id: number;
  lock_order_when_paid: string;
}
