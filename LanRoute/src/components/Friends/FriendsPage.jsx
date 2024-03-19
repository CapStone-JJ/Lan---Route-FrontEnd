import React from 'react';
import FriendsList from './FriendsList';
import FriendRequestsList from './FriendRequests';

const FriendsPage = () => {
  return (
    <div className="friends-page">
      <h1>Friends</h1>
      <div className="friends-content">
        <div className="friend-requests">
          <h2>Friend Requests</h2>
          <FriendRequestsList />
        </div>
        <div className="current-friends">
          <h2>My Friends</h2>
          <FriendsList />
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
