import { lanRouteApi } from "./lanRouteAPi";

const friendRequestApi = lanRouteApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch friend requests for the currently authenticated user
    getFriendRequests: builder.query({
      query: () => "/api/friends/requests",
      providesTags: ["FriendRequests"],
    }),

    // Accept a friend request
    acceptFriendRequest: builder.mutation({
      query: (requestId) => ({
        url: `/api/friends/requests/${requestId}/accept`,
        method: "POST",
      }),
      invalidatesTags: ["FriendRequests", "Friends"], // Assuming you have a tag for friends to refresh the friend list
    }),

    // Decline a friend request
    declineFriendRequest: builder.mutation({
      query: (requestId) => ({
        url: `/api/friends/requests/${requestId}/decline`,
        method: "POST",
      }),
      invalidatesTags: ["FriendRequests"],
    }),

    // Send a friend request
    sendFriendRequest: builder.mutation({
      query: (recipientId) => ({
        url: `/api/friends/request`,
        method: "POST",
        body: { recipientId },
      }),
      invalidatesTags: ["FriendRequests"],
    }),
  }),
});

export const {
  useGetFriendRequestsQuery,
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useSendFriendRequestMutation,
} = friendRequestApi;

export default friendRequestApi;
