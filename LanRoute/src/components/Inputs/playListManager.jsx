import { useState, useEffect } from "react";
import { useGetPlaylistsQuery, useAddPlaylistMutation, useEditPlaylistMutation, useDeletePlaylistMutation, useGetUserPlaylistsQuery } from "../../api/widgets";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TextField, Button, MenuItem } from "@mui/material";
import "../Styles/playlistStyles.css"

function PlaylistManager() {
    const userId = useSelector((state) => state.user.credentials.user.userId);
    const [playlistUrl, setPlaylistUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('new', 'Spotify');
    const [error, setError] = useState('');
    const { data: playlistsData, error: playlistsError, refetch: refetchPlaylists } = useGetPlaylistsQuery(category);
    const [addPlaylist] = useAddPlaylistMutation();
    const [editPlaylist] = useEditPlaylistMutation();
    const { data: userPlaylistsData, refetch: refetchUserPlaylist } = useGetUserPlaylistsQuery(userId);
    const [deletePlaylist] = useDeletePlaylistMutation();
    const createMarkup = (htmlString) => ({ __html: htmlString });

    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

    const handleEditClick = (playlistId, currentTitle, currentDescription) => {
        setSelectedPlaylistId(playlistId);
        setNewTitle(currentTitle);
        setNewDescription(currentDescription);
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        setNewTitle('');
        setNewDescription('');
        setEditMode(false);
        setSelectedPlaylistId(null);
    };

    const handleEditSubmit = async () => {
        try {
            // Call the edit mutation to update the playlist
            await editPlaylist({ body: { id: selectedPlaylistId, title: newTitle, description: newDescription } });
            // Refetch playlists
            refetchUserPlaylist();
            refetchUserPlaylist();
            // Clear the edit form and hide it
            handleCancelEdit();
        } catch (error) {
            console.error('Error editing playlist:', error);
            setError('An error occurred while editing the playlist. Please try again later.');
        }
    };



    useEffect(() => {
        refetchPlaylists();
    }, [category]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Call the API to add a new playlist
            await addPlaylist({ body: { playlistUrl, title, description, category, userId } });

            // Reset form fields
            setPlaylistUrl('');
            setTitle('');
            setDescription('');
            setCategory('');

            // Refetch playlists to update the list
            refetchPlaylists();
        } catch (error) {
            console.error('Error adding playlist:', error);
            setError('An error occurred while adding the playlist. Please try again later.');
        }
    };

    const handleDelete = async (playlistId) => {
        // Display a confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this playlist?");
        if (!confirmDelete) {
            return; // Do nothing if the user cancels the deletion
        }
    
        try {
            await deletePlaylist(playlistId); // Ensure playlistId is a number
            refetchUserPlaylist();
        } catch (error) {
            console.error('Error deleting playlist:', error);
            setError('An error occurred while deleting the playlist. Please try again later.');
        }
    };



    // Filter playlists based on their URLs
    const spotifyPlaylists = playlistsData?.playlists.filter(playlist => playlist.url.includes('open.spotify.com'));
    const newPlaylists = playlistsData?.playlists.filter(playlist => playlist.url.includes('open.spotify.com'));

return (
        <div>
            <form onSubmit={handleSubmit}>
        {/* Replace regular HTML input with MUI TextField */}
        <TextField
          id="playlistUrl"
          label="Playlist URL"
          value={playlistUrl}
          onChange={(event) => setPlaylistUrl(event.target.value)}
          required
        />
        <TextField
          id="title"
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          id="description"
          label="Description"
          multiline
          rows={1}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField
          id="category"
          select
          label="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
        >
          <MenuItem value="AppleMusic">Apple Music</MenuItem>
          <MenuItem value="Spotify">Spotify</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Add Playlist
        </Button>
      </form>
        {playlistsError && <p>Error loading playlists: {playlistsError.message}</p>}
        {/* User's Playlists */}
            <div className="playlist-group">
                <h2>Your Playlists</h2>
                <ul className="playlist-list">
                    {userPlaylistsData && userPlaylistsData.playlists.map(playlist => (
                        <li key={playlist.id} className="playlist-item">
                            <h3>{playlist.title}</h3>
                            <p>{playlist.description}</p>
                            <div dangerouslySetInnerHTML={createMarkup(playlist.embedCode)} />
                            <div>
                            <button onClick={() => handleEditClick(playlist.id, playlist.title, playlist.description)}>Edit</button>

                                <button onClick={() => handleDelete(playlist.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Edit Form */}
            {editMode && (
                <div className="edit-form">
                    <h3>Edit Playlist</h3>
                    <input
                        type="text"
                        placeholder="New Title"
                        value={newTitle}
                        onChange={(event) => setNewTitle(event.target.value)}
                    />
                    <textarea
                        placeholder="New Description"
                        value={newDescription}
                        onChange={(event) => setNewDescription(event.target.value)}
                    />
                    <div>
                        <button onClick={handleEditSubmit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                </div>
            )}
        {/* New Playlists */}
        <div className="playlist-group">
            <h2>New Playlists</h2>
            <ul className="playlist-list">
                {newPlaylists && newPlaylists.slice(0, 6).map(playlist => (
                    <li key={playlist.id} className="playlist-item">
                        <h3>{playlist.title}</h3>
                        <p>{playlist.description}</p>
                        <p>
                        <Link to={`/profile/${playlist.owner.username}`}>
                        {playlist.owner.username}
                        </Link>
                        </p>
                        <div dangerouslySetInnerHTML={createMarkup(playlist.embedCode)} />
                    </li>
                ))}
            </ul>
        </div>

        {/* Spotify Playlists */}
        <div className="playlist-group">
            <h2>Spotify Playlists</h2>
            <ul className="playlist-list">
                {spotifyPlaylists && spotifyPlaylists.slice(0, 6).map(playlist => (
                    <li key={playlist.id} className="playlist-item">
                        <h3>{playlist.title}</h3>
                        <p>{playlist.description}</p>
                        <p>
                        <Link to={`/profile/${playlist.owner.username}`}>
                        {playlist.owner.username}
                        </Link>
                        </p>
                        <div dangerouslySetInnerHTML={createMarkup(playlist.embedCode)} />
                    </li>
                ))}
            </ul>
        </div>
        {/* Error message */}
        {error && <p>{error}</p>}
    </div>
);
}

export default PlaylistManager;

