import React from 'react';
import FriendsList from './FriendsList';
import FriendRequestsList from './FriendRequests';
import { Grid, Typography, Container } from '@mui/material';

const FriendsPage = () => {
  return (
    <Container className="friends-page">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Friend Requests
          </Typography>
          <FriendRequestsList />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            My Friends
          </Typography>
          <FriendsList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FriendsPage;

