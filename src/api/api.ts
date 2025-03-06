import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {TUserData} from "@/api/api.types";

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5227',
  }),
  tagTypes: ['Users'],

  endpoints: build => ({
    // tan como el backend no funciona - no tengo ni pequeña idea como es la estructura de datos por eso puse any
    getUsers: build.query<any, void>({
      query: () => '/api/User',
      providesTags: ['Users'],
    }),
    addUser: build.mutation<any, {body: TUserData}>({
      query: (body) => {
        return {
          url: '/api/User',
          method: 'POST',
          body
        };
      },
      invalidatesTags: result => (result ? ['Users'] : []),
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = usersApi;
