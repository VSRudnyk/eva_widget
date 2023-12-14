import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messageAPI = createApi({
  reducerPath: 'messageAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/database/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    greet: builder.query({
      query: () => 'greet',
    }),
    chat: builder.mutation({
      query: (credentials) => ({
        url: 'chat',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useGreetQuery, useChatMutation } = messageAPI;
