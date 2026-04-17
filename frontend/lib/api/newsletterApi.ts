import { apiSlice } from './apiSlice';

export const newsletterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSubscribeMutation } = newsletterApi;
