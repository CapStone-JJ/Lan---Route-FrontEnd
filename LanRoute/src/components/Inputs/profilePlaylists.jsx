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
    const createMarkup = (htmlString) => ({ __html: htmlString });

    console.log(userData);

    useEffect(() => {
        if (userData) {
            setUserId(userData.id); // Set the userId once user data is fetched
        }
    }, [userData]);

    useEffect(() => {
        if (userId) {
            refetch();
        }
    }, [userId]);

    useEffect(() => {
        if (data) {
            setPlaylists(data.playlists);
        }
    }, [data]);

    return (
        <div className="playlist-group">
            <h2>Playlists</h2>
            <ul className="playlist-list">
                {error && <p>Error loading playlists: {error.message}</p>}
                {playlists.length === 0 && <p>No playlists added yet.</p>}
                <ul>
                    {playlists && playlists.slice(0, 3).map(playlist => (
                        <li key={playlist.id} className="playlist-item">
                            <h3>{playlist.title}</h3>
                            <p>{playlist.description}</p>
                            <div dangerouslySetInnerHTML={createMarkup(playlist.embedCode)} />
                        </li>
                    ))}
                </ul>
            </ul>
        </div>
    );
}

ProfilePlaylists.propTypes = {
    username: PropTypes.string.isRequired
};

export default ProfilePlaylists;

