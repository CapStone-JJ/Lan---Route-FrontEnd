import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CREDENTIALS = "credentials";

export const lanRouteApi = createApi({
  reducerPath: "lanRouteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3333",
    prepareHeaders: (headers, { getState }) => {
      const credentials = JSON.parse(window.sessionStorage.getItem(CREDENTIALS));
      const token = (credentials?.token || "{}");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getVerificationToken: builder.query({
      query: (identifier, token) => ({
        query: () => ({
          url: `api/tokenverification/verify/${identifier}/${token}`,
        }),
      }),
    }),

    deleteVerificationToken: builder.mutation({
      query: (identifier, token) => ({
        url: `api/tokenverification/verify/${identifier}/${token}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetVerificationTokenQuery,
  useDeleteVerificationTokenMutation,
} = lanRouteApi;

