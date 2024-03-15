import { lanRouteApi } from "./lanRouteAPi";

const commentApi = lanRouteApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => `/api/comments/post/${postId}`,
    }),
    addComment: builder.mutation({
      query: (body) => ({
        url: "/api/comments",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Notifications"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/api/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
    getVotes: builder.query({
      query: () => "/api/votes",
    }),
    addVote: builder.mutation({
      query: (body) => ({
        url: "/api/votes",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Notifications"],
    }),
    deleteVote: builder.mutation({
      query: (id) => ({
        url: `/api/votes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetVotesQuery,
  useAddVoteMutation,
  useDeleteVoteMutation,
} = commentApi;

export default commentApi;
