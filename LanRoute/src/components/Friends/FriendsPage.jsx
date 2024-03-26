import React from 'react';
import FriendsList from './FriendsList';
import FriendRequestsList from './FriendRequests';
import { Grid, Typography, Container, Paper } from '@mui/material';

const FriendsPage = () => {
  return (
    <Container className="friends-page" maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', marginTop: "30px" }}>
            <Typography variant="h5" gutterBottom>
              Friend Requests
            </Typography>
            <div style={{ marginTop: '0px' }}> {/* Add top margin */}
            <FriendRequestsList />
          </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', marginTop: "30px" }}>
            <Typography variant="h5" gutterBottom>
              My Friends
            </Typography>
            <FriendsList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FriendsPage;


