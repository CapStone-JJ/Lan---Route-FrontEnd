import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CREDENTIALS = "credentials";

export const lanRouteApi = createApi({
    reducerPath: "lanRouteApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3333",
      prepareHeaders: (headers, { getState }) => {
        const credentials = window.sessionStorage.getItem(CREDENTIALS);
        const parsedCredentials = JSON.parse(credentials || "{}");
        const token = parsedCredentials.token;
        if (token) {
            headers.set("Authorization", token);
        }
        return headers;
      },
    }),
});