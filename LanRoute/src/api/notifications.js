import { lanRouteApi } from "./lanRouteAPi";

const notificationApi = lanRouteApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch notifications for the currently authenticated user
    getNotifications: builder.query({
      query: () => ({
        url: "/api/notifications",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),

    // Mark a specific notification as read
    markNotificationAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/api/notifications/${notificationId}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),

    // Mark all notifications as read
    markAllNotificationsAsRead: builder.mutation({
      query: () => ({
        url: "/api/notifications/markAllAsRead",
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),

    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/api/notifications/${notificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"], // Invalidate to refetch notifications list
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi;

export default notificationApi;
