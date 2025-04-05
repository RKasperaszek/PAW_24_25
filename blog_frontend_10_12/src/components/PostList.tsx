import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Post = { id: number, title: string };

const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
    }, []);

    return (
        <div>
            <h1>Posty</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
