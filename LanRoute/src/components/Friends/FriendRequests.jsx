import React from 'react';
import { useGetFriendRequestsQuery, useAcceptFriendRequestMutation, useDeclineFriendRequestMutation } from '../../api/friendRequest';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';

const FriendRequestsList = () => {
    const { data: friendRequests, isLoading, isError } = useGetFriendRequestsQuery();
    const [acceptFriendRequest] = useAcceptFriendRequestMutation();
    const [declineFriendRequest] = useDeclineFriendRequestMutation();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching friend requests.</div>;

    const handleAccept = async (requestId) => {
        await acceptFriendRequest(requestId);
        // Optionally show success feedback
    };

    const handleDecline = async (requestId) => {
        await declineFriendRequest(requestId);
        // Optionally show success feedback
    };

    return (
        <List>
            {friendRequests && friendRequests.length > 0 ? (
                friendRequests.map((request) => (
                    <React.Fragment key={request.id}>
                        <ListItem 
                            secondaryAction={
                                <>
                                    <Button onClick={() => handleAccept(request.id)} color="primary">Accept</Button>
                                    <Button onClick={() => handleDecline(request.id)} color="secondary">Decline</Button>
                                </>
                            }>
                            <ListItemText primary={request.sender.username} />
                        </ListItem>
                        <Divider component="li" />
                    </React.Fragment>
                ))
            ) : (
                <ListItem>
                    <ListItemText align="center" variant="body1" primary="No friend requests" />
                </ListItem>
            )}
        </List>
    );
};

export default FriendRequestsList;



