import { useGetPlaylistsQuery } from '../../api/widgets';
import { Link } from 'react-router-dom';
import "../Styles/newPlaylists.css";

const NewPlaylists = () => {
    const { data: playlistsData } = useGetPlaylistsQuery('new');

    return (
        <div className="new-playlists-container"> {/* Apply the new container class */}
            <ul className="new-playlists-list"> {/* Apply the new list class */}
                {playlistsData?.playlists.slice(0, 3).map(playlist => (
                    <li key={playlist.id} className="new-playlist-item"> {/* Apply the new item class */}
                        <div className="new-playlist-content"> {/* Apply the new content class */}
                            <h3 className="new-playlist-title">{playlist.title}</h3> {/* Apply the new title class */}
                            <p className="new-playlist-description">{playlist.description}</p> {/* Apply the new description class */}
                            <p>
                                <Link to={`/profile/${playlist.owner.username}`} className="new-playlist-owner">{playlist.owner.username}</Link> {/* Apply the new owner class */}
                            </p>
                            <div className="new-playlist-embed" dangerouslySetInnerHTML={{ __html: playlist.embedCode }} /> {/* Apply the new embed class */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewPlaylists;


