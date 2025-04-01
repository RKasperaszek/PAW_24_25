import navigation from '../assets/navigation';
import "../assets/postList.sass";
import PostList from "../assets/postList.tsx";
import { useEffect, useState } from 'react';


const Post = () => {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <>
            {navigation()}
            <div>
                <h2>Lista Postów</h2>
                <PostList posts={posts}/>
            </div>
        </>

    );
}

export default Post;
