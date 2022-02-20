import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { transformApiUser, User, UserFromApi } from 'src/models/user.model';
import { RootState } from 'src/redux/store';

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    login: builder.query<User, LoginRequest>({
      query: ({ email, password }) => `/users?user_email=${email}&user_password=${password}`,
      transformResponse: (response: UserFromApi[]) => {
        return transformApiUser(response[0]);
      }
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected'
    })
  })
});

export const { useLoginQuery, useProtectedMutation, useLazyLoginQuery } = authApi;
