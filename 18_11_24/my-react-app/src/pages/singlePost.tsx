import Navigation from "../assets/navigation.tsx";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState<any>(null);
    const [author, setAuthor] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const postData = await postResponse.json();
            setPost(postData);

            const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
            const userData = await userResponse.json();
            setAuthor(userData);
        };

        fetchData();
    }, [id]);

    if (!post || !author) return <div>Not found</div>;

    return (
        <>
            {Navigation()}
            <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <h4>Author: {author.name}</h4>
                <p>Email: {author.email}</p>
            </div>
        </>
    );
};

export default SinglePost;
