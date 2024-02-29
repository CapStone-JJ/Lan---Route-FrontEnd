import { lanRouteApi } from "./lanRouteAPi";

const commentApi = lanRouteApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => `/api/comments/post/${postId}`,
      query: () => `/api/comments/post/${postId}`,
    }),
    addComment: builder.mutation({
      query: (body) => ({
        url: "/api/comments",
        method: "POST",
        body: body,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/api/comments/${id}`,
        method: "DELETE",
      }),
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
    }),
    deleteVote: builder.mutation({
      query: (id) => ({
        url: `/api/votes/${id}`,
        method: "DELETE",
      }),
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
