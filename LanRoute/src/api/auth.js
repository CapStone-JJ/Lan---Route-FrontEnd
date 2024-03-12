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
    }),
    logout: builder.mutation({
      queryFn: () => ({ data: {} }),
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
      query: (search) => "/api/nameSearch/" + search,
    }),
    getAllFriends: builder.query({
      query: () => "/api/friends",
    }),
    getUserFriends: builder.query({
      query: (userId) => `/api/friends/users/${userId}/friends`,
    }),
    addFriend: builder.mutation({
      query: (body) => ({
        url: "/api/friends",
        method: "POST",
        body: body,
      }),
    }),
    deleteFriend: builder.mutation({
      query: (id) => ({
        url: "/api/friends/" + id,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useEditUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useSearchNameQuery,
  useGetAllFriendsQuery,
  useGetUserFriendsQuery,
  useAddFriendMutation,
  useDeleteFriendMutation,
} = authApi;
