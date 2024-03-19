import React from "react";
import { useGetAllFriendsQuery } from "../../api/auth";

const FriendsList = () => {
  const { data: friends, isLoading, isError } = useGetAllFriendsQuery();

  if (isLoading) return <div>Loading friends...</div>;
  if (isError) return <div>Error fetching friends.</div>;

  return (
    <div>
        
      {friends && friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>{friend.username}</li>
          ))}
        </ul>
      ) : (
        <p>You have no friends yet.</p>
      )}
    </div>
  );
};

export default FriendsList;
