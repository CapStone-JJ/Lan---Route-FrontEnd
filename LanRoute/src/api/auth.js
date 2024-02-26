import {lanRouteApi} from "./api";

const authApi = api.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (cred)=>({
                url:"/auth/login",
                method: "POST",
                body: cred
            })
        }),
        register: builder.mutation({
            query: (cred)=>({
                url:"/auth/register",
                method: "POST",
                body: cred
            })
        }),
        edit: builder.mutation({
            query: (cred)=>({
                url:`/auth/${id}`,
                method: "PUT",
                body: cred
            })
        }),
        logout: builder.mutation({
            queryFn: ()=>({data:{}})
        }),
        getUser: builder.query({
            query: (cred) => ({
              url: "/auth/me",
              method: "GET",
              body: cred,
            }),
          }),
        delete: builder.mutation({
            query: (id) => ({
              url: `/auth/${id}`,
              method: "DELETE",
            }),
          }),
    })
})

export const { useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useEditMutation, useGetUserQuery, useDeleteMutation } = authApi