import { lanRouteApi } from "./lanRouteAPi";

const authApi = lanRouteApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (cred) => ({
        url: "/auth/login",
        method: "POST",
        body: cred,
      }),
    }),
    register: builder.mutation({
      query: (cred) => ({
        url: "/auth/register",
        method: "POST",
        body: cred,
      }),
    }),
    editUser: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/auth/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation({
      queryFn: () => ({ data: {} }),
    }),
    userProfile: builder.query({
      query: (username) => `auth/${username}`,
      providesTags: ['User'],
    }),
    getUser: builder.query({
      query: (cred) => ({
        url: "/auth/me",
        method: "GET",
        body: cred,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/${id}`,
        method: "DELETE",
      }),
    }),
    searchName: builder.query({
      query: (search) => `/api/nameSearch/${search}`,
    }),
    getAllFriends: builder.query({
      query: () => "/api/friends",
      providesTags: ["Friends"], // Add this to indicate that this query provides 'Friends' data
    }),
    getUserFriends: builder.query({
      query: (userId) => `/api/friends/users/${userId}/friends`,
      providesTags: ["Friends"], // Indicates that this query also provides 'Friends' data
    }),
    addFriend: builder.mutation({
      query: (body) => ({
        url: "/api/friends",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Friends"],
    }),
    deleteFriend: builder.mutation({
      query: (id) => ({
        url: "/api/friends/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Friends"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useEditUserMutation,
  useUserProfileQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useLazySearchNameQuery,
  useGetAllFriendsQuery,
  useGetUserFriendsQuery,
  useAddFriendMutation,
  useDeleteFriendMutation,
} = authApi;
