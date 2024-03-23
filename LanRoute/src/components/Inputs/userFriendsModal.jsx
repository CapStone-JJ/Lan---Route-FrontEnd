import { useState } from "react";
import { useGetAllFriendsQuery, useUserProfileQuery } from "../../api/auth";
import { Link, useParams } from "react-router-dom";
import "../Styles/friendsListModal.css";
import { Button } from "@mui/material";

const FriendsModal = ({ userId }) => {
  const { data: friends, isLoading, isError } = useGetAllFriendsQuery(userId);

  if (isLoading) return <div>Loading friends...</div>;
  if (isError) return <div>Error fetching friends.</div>;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        <h2>Friends</h2>
        {friends && friends.length > 0 ? (
          <ul>
            {friends.map((friend) => (
              <li key={friend.id}>
                <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No friends found.</p>
        )}
      </div>
    </div>
  );
};

const FriendsList = () => {
const {username} = useParams();
const { data: userData } = useUserProfileQuery(username); // Fetch user data including user ID
const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Button onClick={toggleModal}>Show Friends</Button>
      {showModal && <FriendsModal userId={userData.id} />}
    </div>
  );
};

export default FriendsList;
