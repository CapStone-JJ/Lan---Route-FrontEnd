import React from "react";
import { useGetAllFriendsQuery } from "../../api/auth";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import { Divider, Typography } from '@mui/material';

const FriendsList = () => {
  const { data: friends, isLoading, isError } = useGetAllFriendsQuery();

  if (isLoading) return <div>Loading friends...</div>;
  if (isError) return <div>Error fetching friends.</div>;

  return (
    <List>
      {friends && friends.length > 0 ? (
        friends.map((friend) => (
          <React.Fragment key={friend.id}>
            <ListItem component={Link} to={`/profile/${friend.username}`}>
              <ListItemText primary={friend.username} />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))
      ) : (
        <ListItem className="my-friends-text">
      <ListItemText>
        <Typography align="center" variant="body1">You have no friends yet.</Typography>
      </ListItemText>
    </ListItem>
      )}
    </List>
  );
};

export default FriendsList;

