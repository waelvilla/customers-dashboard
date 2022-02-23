import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Customer,
  FetchCustomersResponse,
  CustomerFromApi,
  transformApiCustomer
} from 'src/models/customer.model';

export const customersApi = createApi({
  reducerPath: 'customers',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  endpoints: (builder) => ({
    customers: builder.query<FetchCustomersResponse, number>({
      query: (page) => `/customers?_page=${page}`,
      transformResponse: (response: CustomerFromApi[], meta, page) => {
        const countHeader = meta?.response?.headers?.get('X-Total-Count');
        const count = countHeader ? parseInt(countHeader, 10) : 0;
        const totalPages = count ? Math.round(count / 10) : 1;
        const customers = response.map((customer) => transformApiCustomer(customer));
        return {
          page,
          totalPages,
          count,
          customers
        };
      }
    }),
    customer: builder.query<Customer, string>({
      query: (id: string) => `/customers?customer_id=${id}`,
      transformResponse: (response: CustomerFromApi[]) => {
        return transformApiCustomer(response[0]);
      }
    })
  })
});

export const { useCustomersQuery, useCustomerQuery } = customersApi;
