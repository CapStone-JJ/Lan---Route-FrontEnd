import { useState, useEffect } from 'react';
import { useGetFeedQuery } from '../api/posts';
import formatDate from './Inputs/formatDate';

const Feed = () => {
    const [token, setToken] = useState('');
    const [headers, setHeaders] = useState({
        Authorization: '',
        'Content-Type': 'application/json',
    });
    const { data: feedData } = useGetFeedQuery({ headers });

    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            setHeaders({
                ...headers,
                Authorization: `Bearer ${storedToken}`,
            });
        }
    }, []);

    return (
        <div>
            {feedData && feedData.map(post => (
                <div key={post.id}>
                    <p>{post.author?.username}</p>
                    <p>{post.content}</p>
                    <p>{formatDate(post.createdAt)}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Feed;


