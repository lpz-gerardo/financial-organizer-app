import { apiSlice } from './apiSlice';
import { REACT_APP_DEV_URL } from '../../config';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${REACT_APP_DEV_URL}/user/login`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${REACT_APP_DEV_URL}/user/signup`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${REACT_APP_DEV_URL}/user/logout`,
                method: 'POST',
            }),
        }),       
    }),
});

export const { 
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} = usersApiSlice;