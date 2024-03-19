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
        convertPlaylistUrl:builder.mutation({
            query:() => ({
                url: '/api/convert',
                method: "POST",
            })
        }),
    })
})

export const {
    useGetWidgetsQuery,
    useGetSpecificWidgetQuery,
    useAddWidgetMutation,
    useEditWidgetMutation,
    useDeleteWidgetMutation,
    useConvertPlaylistUrlMutation,
   } = widgetApi;

   export default widgetApi;