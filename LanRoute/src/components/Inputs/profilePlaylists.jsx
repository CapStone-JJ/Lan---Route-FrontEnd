import { useState, useEffect } from "react";
import { useGetUserPlaylistsQuery } from "../../api/widgets";
import { useUserProfileQuery } from "../../api/auth";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import "../Styles/playlistOnProfile.css";

function ProfilePlaylists({ username }) {
    const [userId, setUserId] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const { data: userData, error: userError } = useUserProfileQuery(username);
    const { data, error, refetch } = useGetUserPlaylistsQuery(userId);

    useEffect(() => {
        if (userData && userData.id) {
            setUserId(userData.id); // Set the userId once user data is fetched and contains a valid id
        }
    }, [userData]);

    useEffect(() => {
        if (userId !== null) {

            refetch(); // Refetch playlists only if userId is not null
        }
    }, [userId, refetch]);

    useEffect(() => {
        if (data) {
            setPlaylists(data.playlists);
        }
    }, [data]);

    return (
        <div className="profile-playlists-container">
            <h2 className="profile-playlists-heading">My Playlists</h2>
            <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
            <div className="profile-playlists-list">
                {error && <p className="profile-playlists-error-message">Error loading playlists: {error.message}</p>}
                {playlists.length === 0 && <p className="profile-playlists-no-playlists-message">No playlists added yet.</p>}
                <ul className="profile-playlists-items">
                    {playlists && playlists.slice(0, 4).map(playlist => (
                        <li key={playlist.id} className="profile-playlists-item">
                            <h3 className="profile-playlists-title">{playlist.title}</h3>
                            <p className="profile-playlists-description">{playlist.description}</p>
                            <div className="profile-playlists-embed" dangerouslySetInnerHTML={{ __html: playlist.embedCode }} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

ProfilePlaylists.propTypes = {
    username: PropTypes.string.isRequired
};

export default ProfilePlaylists;


