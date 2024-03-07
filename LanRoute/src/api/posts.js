import { lanRouteApi } from "./lanRouteAPi";

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
                url:`/api/posts/${id}`,
                method:'DELETE'
            })
        }),
        getLikes: builder.query({
            query: (postId)=> '/api/likes/'+postId,
        }),
        addLike : builder.mutation({
            query:(body)=>({
                url:'/api/likes',
                method:"POST",
                body:body
            })
        }),
        deleteLike:builder.mutation({
            query:(id)=>({
                url:'/api/likes/'+id,
                method:'DELETE'
            })
        }),
        
        editPost: builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: '/api/posts/'+id,
                    method:"PUT",
                    body
                }
            }
        }),
        getFeed: builder.query({
            query: () => 'api/feed',
        })
    })
})

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useSearchPostQuery,
    useAddPostMutation,
    useDeletePostMutation,
    useEditPostMutation,
    useAddLikeMutation,
    useDeleteLikeMutation,
    useGetFeedQuery,
} = postApi;

    export default postApi;