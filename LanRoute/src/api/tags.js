import { lanRouteApi } from "./lanRouteAPi";

const tagApi = lanRouteApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => "/api/tags",
    }),
    getTag: builder.query({
      query: (id) => "/api/tags/" + id,
    }),
    addTag: builder.mutation({
      query: (body) => ({
        url: "/api/tags",
        method: "POST",
        body: body,
      }),
    }),
    deleteTag: builder.mutation({
      query: (id) => ({
        url: "/api/tags/" + id,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetTagQuery,
  useAddTagMutation,
  useDeleteTagMutation,
} = tagApi;

export default tagApi;
