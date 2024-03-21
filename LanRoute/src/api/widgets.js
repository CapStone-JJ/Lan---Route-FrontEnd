import { lanRouteApi } from "./lanRouteAPi";

const widgetApi = lanRouteApi.injectEndpoints({
    endpoints: (builder)=>({
        getWidgets: builder.query({
            query: ()=> '/api/widget',
        }),
        getSpecificWidget: builder.query({
            query: (id) => '/api/widget/'+id   
        }),
        addWidget: builder.mutation({
            query:(body)=>({
                url:'/api/widget',
                method:"POST",
                body:body
            })
        }),
        editWidget: builder.mutation({
            query(data){
                const {id, ...body}=data;
                return {
                    url: '/api/widget/'+id,
                    method:"PUT",
                    body
                }
            }
        }),
        deleteWidget:builder.mutation({
            query:(id)=>({
                url:'/api/widget/'+id,
                method:'DELETE'
            })
        }),
        getPlaylists: builder.query({
            query: (category) => `/api/playlist/playlists/${category}`,
            providesTags: ["Playlist"],

        }),
        getUserPlaylists: builder.query({
            query: (userId) => `/api/playlist/user/${userId}`,
        }),
        getSpecificPlaylist: builder.query({
            query: (id) => `api/playlist/${id}`,
        }),
        addPlaylist: builder.mutation({
            query: (data) => {
                const {body} =data;
                return {
                    url: `/api/playlist/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatedTags: ["Playlist"],
        }),
        editPlaylist: builder.mutation({
            query: (data) => {
                const {id, ...body} = data;
                return {
                    url:`/api/playlist/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatedTags: ["Playlist"],
        }),
        deletePlaylist: builder.mutation({
            query: (id) => ({
                url: `/api/playlist/${id}`,
                method: 'DELETE',
            }),
            invalidatedTags: ["Playlist"],
        }),
        addToProfile: builder.mutation({
            query: (playlistId) => ({
                url: `/api/playlist/add-to-profile/${playlistId}`,
                method: 'POST',
            }),
            invalidatedTags: ["Playlist"],
        }),
    })
})

export const {
    useGetWidgetsQuery,
    useGetSpecificWidgetQuery,
    useAddWidgetMutation,
    useEditWidgetMutation,
    useDeleteWidgetMutation,
    useGetPlaylistsQuery,
    useGetUserPlaylistsQuery,
    useGetSpecificPlaylistQuery,
    useAddPlaylistMutation,
    useEditPlaylistMutation,
    useDeletePlaylistMutation,
    useAddToProfileMutation,
   } = widgetApi;

   export default widgetApi;