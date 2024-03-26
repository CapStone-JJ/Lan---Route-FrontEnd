import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { useGetNotificationsQuery } from 'your-api-library'; // Import useGetNotificationsQuery from your API library

function NotificationButton() {
  // Query for fetching notifications
  const { data: notifications, isLoading, isError } = useGetNotificationsQuery();

  // Calculate the notification count
  const notificationCount = notifications ? notifications.length : 0;

  return (
    <IconButton size="large" aria-label="show notifications" color="inherit">
      <Badge badgeContent={notificationCount} color="error">
        <MailIcon />
      </Badge>
    </IconButton>
  );
}

export default NotificationButton;

