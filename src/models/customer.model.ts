import { Gender, UserStatus } from 'src/types';

export interface CustomerFromApi {
  id: string;
  customer_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: Gender;
  birth_date: string;
  country_code: string;
  address: {
    street: string;
    city: string;
    postal_code: string;
  };
  is_email_verified: boolean;
  is_id_verified: boolean;
  national_id: string;
  status: UserStatus;
}

export interface FetchCustomersResponse {
  count: number;
  page: number;
  totalPages: number;
  customers: Customer[];
}
export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: Gender;
  birthDate: Date;
  countryCode: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  isEmailVerified: boolean;
  isIdVerified: boolean;
  nationalId: string;
  status: UserStatus;
}

export function transformApiCustomer(apiCustomer: CustomerFromApi): Customer {
  const {
    customer_id,
    email,
    first_name,
    last_name,
    phone_number,
    gender,
    birth_date,
    country_code,
    address,
    is_email_verified,
    is_id_verified,
    national_id,
    status
  } = apiCustomer;
  return {
    id: customer_id,
    email,
    firstName: first_name,
    lastName: last_name,
    phoneNumber: phone_number,
    gender,
    birthDate: new Date(birth_date),
    countryCode: country_code,
    address: {
      street: address?.street,
      city: address?.city,
      postalCode: address?.postal_code
    },
    isEmailVerified: is_email_verified,
    isIdVerified: is_id_verified,
    nationalId: national_id,
    status
  };
}
