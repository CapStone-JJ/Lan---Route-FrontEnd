import React from 'react';
import { useGetFriendRequestsQuery, useAcceptFriendRequestMutation, useDeclineFriendRequestMutation } from '../../api/friendRequest';

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
        <div>
            {friendRequests && friendRequests.length > 0 ? (
                <ul>
                    {friendRequests.map((request) => (
                        <li key={request.id}>
                            {request.sender.username}
                            <button onClick={() => handleAccept(request.id)}>Accept</button>
                            <button onClick={() => handleDecline(request.id)}>Decline</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No friend requests</p>
            )}
        </div>
    );
};

export default FriendRequestsList;


