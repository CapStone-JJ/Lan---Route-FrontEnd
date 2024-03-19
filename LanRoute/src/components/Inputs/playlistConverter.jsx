import { useState } from "react";
import { useConvertPlaylistUrlMutation } from "../../api/widgets";

function PlaylistConverter() {
    const [playlistUrl, setPlaylistUrl] = useState('');
    const [convertPlaylistUrl] = useConvertPlaylistUrlMutation();
    const [embedCode, setEmbedCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {data} = await convertPlaylistUrl({
                variables: { playlistUrl }
            });

            if (data && data.convertPlaylistUrl && data.convertPlaylistUrl.embedCode) {
                setEmbedCode(data.convertPlaylistUrl.embedCode);
                setError('');
            } else {
                setError('Error generating embed code' );
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occured. Please try again later.');
        } 
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="playlistUrl">Playlist URL:</label>
                <input 
                type="text"
                id="playlistUrl"
                value={playlistUrl}
                onChange={(event) => setPlaylistUrl(event.target.value)}
                required
                 />
                 <button type="submit">Generate Embed</button>
            </form>

            {embedCode && (
                <div>
                    <h2>Embed Code:</h2>
                    <div dangerouslySetInnerHTML={{ __html: embedCode }} />
                </div>
            )}

            {error && <p>{error}</p>}
        </div>
    );
}

export default PlaylistConverter;
