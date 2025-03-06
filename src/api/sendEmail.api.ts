import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emailApi = createApi({
  reducerPath: "emailApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://emailsender/" }),
  endpoints: (builder) => ({
    sendEmail: builder.mutation<{ message: string }, { to: string; body: string }>({
      query: (emailData) => ({
        url: "",
        method: "POST",
        body: emailData,
      }),
    }),
  }),
});

export const { useSendEmailMutation } = emailApi;
