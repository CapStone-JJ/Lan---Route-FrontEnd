import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
} from "../api/notifications";
import formatDate from "./Inputs/formatDate";
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MailIcon from "@mui/icons-material/Mail"; // Icon for unread notifications
import DraftsIcon from "@mui/icons-material/Drafts"; // Icon for read notifications

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
    if (!notification.read) {
      try {
        await markNotificationAsRead(notification.id).unwrap();
        // Optionally update the UI or refetch notifications
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    }
    navigateBasedOnType(notification);
  };

  const navigateBasedOnType = (notification) => {
    // Navigate based on the notification type
    switch (notification.type) {
      case "FRIEND_REQUEST":
        // Navigate to friend requests page
        navigate("/friends");
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

  const deleteSelectedNotifications = async () => {
    try {
      const deletePromises = Array.from(selectedNotifications).map((id) =>
        deleteNotification(id).unwrap()
      );
      await Promise.all(deletePromises);
      // Clear selected after deletion
      setSelectedNotifications(new Set());
      // Optionally, refresh the notifications list
    } catch (error) {
      console.error("Failed to delete selected notifications:", error);
    }
  };

  if (isLoading) return <div>Loading notifications...</div>;
  if (isError) return <div>Error loading notifications.</div>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}>
        <Button variant="outlined" onClick={() => markSelectedAsRead()}>
          Mark selected as read
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={deleteSelectedNotifications}
        >
          Delete Selected
        </Button>
      </Box>
      <List>
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                bgcolor: notification.read ? "#ffffff" : "#f6f6f6",
                "&:hover": {
                  backgroundColor: "#e9e9e9",
                },
                // Apply conditional styling based on read/unread status
              }}
              secondaryAction={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={() => deleteNotification(notification.id).unwrap()}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <Checkbox
                checked={selectedNotifications.has(notification.id)}
                onChange={(e) =>
                  handleCheckboxChange(notification.id, e.target.checked)
                }
              />
              <ListItemText
                primary={`${notification.type} by ${notification.triggerBy.username}`}
                secondary={formatDate(notification.createdAt)}
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  cursor: "pointer",
                  textDecoration: notification.read ? "none" : "underline",
                }}
                primaryTypographyProps={{
                  color: notification.read ? "text.primary" : "text.secondary", // Adjust text color
                }}
              />
              {notification.read ? <DraftsIcon /> : <MailIcon />}
            </ListItem>
          ))
        ) : (
          <Typography>No notifications</Typography>
        )}
      </List>
    </Box>
  );
};

export default Notifications;
