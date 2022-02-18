enum Gender {
    MALE,
    FEMALE
}

enum UserStatus {
    ACTIVE,
    PENDING,
    INACTIVE,
}
export interface Customer {
  customer_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: Gender;
  birth_date: Date;
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
