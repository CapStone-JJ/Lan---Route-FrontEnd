import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CREDENTIALS = "credentials";

export const lanRouteApi = createApi({
  reducerPath: "lanRouteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL,
    prepareHeaders: (headers, { getState }) => {
      const credentials = JSON.parse(
        window.sessionStorage.getItem(CREDENTIALS)
      );
      const token = credentials?.token || "{}";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Posts", "Notifications", "Friends", "FriendRequests", "User", "Playlist"],
  endpoints: (builder) => ({
    // Define your endpoints here
    verifyToken: builder.query({
      query: (identifier, token) => ({
        url: `api/tokenverification/verify/${identifier}/${token}`,
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
  useVerifyTokenQuery,
  useDeleteVerificationTokenMutation,
} = lanRouteApi;

