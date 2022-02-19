import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Customer, CustomerFromApi, transformApiCustomer } from 'src/models/customer.model';

export const customersApi = createApi({
  reducerPath: 'customers',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  endpoints: (builder) => ({
    customers: builder.query<Customer[], void>({
      query: () => '/customers',
      transformResponse: (response: CustomerFromApi[]) => {
        return response.map((customer) => transformApiCustomer(customer));
      }
    })
  })
});

export const { useCustomersQuery } = customersApi;
