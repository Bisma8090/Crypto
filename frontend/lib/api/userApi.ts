import { apiSlice } from './apiSlice';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
  createdAt: string;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => '/users/profile',
    }),
  }),
});

export const { useGetProfileQuery } = userApi;
