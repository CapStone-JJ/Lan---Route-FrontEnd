import {lanRouteApi} from "./api";

const postApi = lanRouteApi.injectEndpoints({
    endpoints: (builder)=>({
        getPosts: builder.query({
            query: ()=> '/api/posts',
        }),
        getPost: builder.query({
            query: (id)=> '/api/posts/'+id
        }),
        // getPagePost: builder.query({
        //     query: (num)=> '/api/posts/page/'+num
        // }),
        searchPost: builder.query({
            query: (search)=>'/api/postSearch/'+search
        }),
        addPost: builder.mutation({
            query:(body)=>({
                url:'/api/posts',
                method:"POST",
                body:body
            })
        }),
        deletePost:builder.mutation({
            query:(id)=>({
                url:'/api/posts/'+id,
                method:'DELETE'
            })
        }),
        likePost : builder.mutation({
            query:(body)=>({
                url:'/api/likes',
                method:"POST",
                body:body
            })
        }),
        // editPost: builder.mutation({
        //     query(data){
        //         const {id, ...body}=data;
        //         return {
        //             url: '/api/posts/'+id,
        //             method:"PUT",
        //             body
        //         }
        //     }
        // }),
    })
})

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useSearchPostQuery,
    useAddPostMutation,
    useDeletePostMutation,
    useLikePostMutation} = postApi;