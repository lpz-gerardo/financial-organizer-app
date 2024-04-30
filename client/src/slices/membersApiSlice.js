import { apiSlice } from './apiSlice';

export const membersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => ({
        url: `/member`,
        method: 'GET',
      }),
      providesTags: ['Members'],
    }),
    addMember: builder.mutation({
      query: (data) => ({
        url: `/member`,
        method: 'POST',
        body: data,
      }),
    }),
    updateMember: builder.mutation({
      query: (data) => ({
        url: '/member',
        method: 'PUT',
        body: data,
      }),
    }),
    deleteMember: builder.mutation({
      query: (data) => ({
        url: '/member',
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMembersQuery,
  useAddMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = membersApiSlice;