import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Customer } from 'models/customer.model';

export const customersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  endpoints: (builder) => ({
    customers: builder.query<Customer[], void>({
      query: () => '/customers'
    })
  })
});

export const { useCustomersQuery } = customersApi;
