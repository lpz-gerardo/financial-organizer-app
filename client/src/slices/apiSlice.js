import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REACT_APP_DEV_URL } from '../../config';

const baseQuery = fetchBaseQuery({ baseUrl: `${REACT_APP_DEV_URL}`, credentials: 'include' });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Member'],
    endpoints: (builder) => ({}),
});