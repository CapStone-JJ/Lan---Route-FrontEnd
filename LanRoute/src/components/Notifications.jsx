import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
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
  const [deleteNotification] = useDeleteNotificationMutation();
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());

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

  const handleCheckboxChange = (id, isChecked) => {
    setSelectedNotifications((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (isChecked) {
        newSelected.add(id);
      } else {
        newSelected.delete(id);
      }
      return newSelected;
    });
  };

  const markSelectedAsRead = async () => {
    try {
      for (let id of selectedNotifications) {
        await markNotificationAsRead(id).unwrap();
      }
      // Optionally, clear selected notifications and refetch or update UI
    } catch (error) {
      console.error("Failed to mark selected notifications as read:", error);
    }
  };

  const deleteSelected = async () => {
    try {
      for (let id of selectedNotifications) {
        await deleteNotification(id).unwrap();
      }
      // Optionally, clear selected notifications and refetch or update UI
    } catch (error) {
      console.error("Failed to delete selected notifications:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    for (let id of selectedNotifications) {
      try {
        await markNotificationAsRead(id).unwrap();
        // After marking as read, you may want to remove it from the selectedNotifications
        setSelectedNotifications((prevSelected) => {
          const updatedSelected = new Set(prevSelected);
          updatedSelected.delete(id);
          return updatedSelected;
        });
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }
  };

  if (isLoading) return <div>Loading notifications...</div>;
  if (isError) return <div>Error loading notifications.</div>;

  return (
    <div>
      <h2>Notifications</h2>
      <button onClick={handleMarkAllAsRead}>Mark all as read</button>
      <button onClick={deleteSelected} style={{ marginLeft: "10px" }}>
        Delete Selected
      </button>
      {notifications && notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="checkbox"
                checked={selectedNotifications.has(notification.id)}
                onChange={(e) =>
                  handleCheckboxChange(notification.id, e.target.checked)
                }
                style={{ marginRight: "10px" }}
              />
              <div
                onClick={() => handleNotificationClick(notification)}
                style={{ flex: 1 }}
              >
                {notification.type} by {notification.triggerBy.username}{" "}
                {formatDate(notification.createdAt)}
              </div>
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
