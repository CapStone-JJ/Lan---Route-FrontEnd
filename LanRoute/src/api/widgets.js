import { lanRouteApi } from "./lanRouteAPi";

const widgetApi = lanRouteApi.injectEndpoints({
    endpoints: (builder)=>({
        getWidgets: builder.query({
            query: ()=> '/api/widget',
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
    })
})

export const {
    useGetWidgetsQuery,
    useAddWidgetMutation,
    useEditWidgetMutation,
    useDeleteWidgetMutation,
   } = widgetApi;

   export default widgetApi;