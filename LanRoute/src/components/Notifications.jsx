import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
} from "../api/notifications";
import formatDate from "./Inputs/formatDate";

const Notifications = () => {
  const navigate = useNavigate();
  const {
    data: notifications,
    isError,
    isLoading,
  } = useGetNotificationsQuery();
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();
  const [markAllNotificationsAsRead] = useMarkAllNotificationsAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  if (isLoading) return <div>Loading notifications...</div>;
  if (isError) return <div>Error loading notifications.</div>;

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();
  };

  const handleNotificationClick = async (notification) => {
    // Mark the notification as read
    try {
      await markNotificationAsRead(notification.id).unwrap();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }

    // Navigate based on the notification type
    switch (notification.type) {
      case "FRIEND_REQUEST":
        // Navigate to friend requests page
        navigate("/friend-requests");
        break;
      case "LIKE":
        // Navigate to the post related to the like
        navigate(`/posts/${notification.postId}`);
        break;
      case "COMMENT":
      case "VOTE":
        // Ensure navigation with state for COMMENT and VOTE types
        navigate(`/posts/${notification.postId}`, {
          state: { commentId: notification.commentId },
        });
        break;
      default:
        console.log("Unknown notification type");
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <button onClick={handleMarkAllAsRead}>Mark all as read</button>
      {notifications && notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              style={{
                cursor: "pointer",
                background: notification.read ? "#ddd" : "#fff",
                padding: "10px",
                margin: "5px",
                borderRadius: "5px",
              }}
            >
              {/* Display notification message with trigger user and date */}
              {notification.type} by {notification.triggerBy.username}{" "}
              {formatDate(notification.createdAt)}
              <button
                onClick={async (event) => {
                  event.stopPropagation(); // Prevent onClick event from bubbling up to the parent li
                  try {
                    await deleteNotification(notification.id).unwrap();
                  } catch (error) {
                    console.error("Failed to delete notification:", error);
                  }
                }}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;
