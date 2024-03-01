import { useState, useEffect } from 'react';
import { useGetPostsQuery } from '../api/posts';

const Feed = () => {
    const [token, setToken] = useState('');
    const [headers, setHeaders] = useState({
        Authorization: '',
        'Content-Type': 'application/json',
    });
    const { data: postsData } = useGetPostsQuery({ headers });

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
            {postsData && postsData.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Feed;


