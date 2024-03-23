import { lanRouteApi } from "./lanRouteAPi";

const postApi = lanRouteApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/api/posts",
    }),
    getPost: builder.query({
      query: (id) => "/api/posts/" + id,
    }),
    userPost: builder.query({
      query: (userId) => `/api/posts/user/${userId}`,
      providesTags: ["Posts"],
    }),
    
    searchPost: builder.query({
      query: (search) => `/api/postSearch/${search}`,
    }),
    addPost: builder.mutation({
      query: (formData) => ({
        url: "/api/posts",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Posts"], // Invalidate 'Posts' tag upon success
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"], // Invalidate 'Posts' tag upon success
    }),
    getLikes: builder.query({
      query: (postId) => "/api/likes/" + postId,
    }),
    addLike: builder.mutation({
      query: (body) => ({
        url: "/api/likes",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Notifications"],
    }),
    deleteLike: builder.mutation({
      query: ({ postId, userId }) => ({
        url: `/api/likes?userId=${userId}&postId=${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts", "Notifications"],
    }),
    editPost: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: "/api/posts/" + id,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Posts"],
    }),
    getFeed: builder.query({
      query: () => "api/feed",
      providesTags: ["Posts"], // This endpoint provides the 'Posts' tag
    }),
  }),
});
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useUserPostQuery,
  useLazySearchPostQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useAddLikeMutation,
  useDeleteLikeMutation,
  useGetFeedQuery,
} = postApi;
export default postApi;
