import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Comment = { id: number, text: string };
type Post = { id: number, title: string, body: string, comments: Comment[] };

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [newComment, setNewComment] = useState("");

    const fetchPost = () => {
        axios.get(`http://localhost:3000/posts/${id}`).then(res => {
            setPost(res.data);
        });
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        await axios.post(`http://localhost:3000/posts/${id}/comments`, { text: newComment });
        setNewComment("");
        fetchPost(); // Refresh comments
    };

    if (!post) return <div>Ładowanie...</div>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <h3>Komentarze</h3>
            <ul>
                {post.comments.map(c => <li key={c.id}>{c.text}</li>)}
            </ul>
            <input
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Dodaj komentarz"
            />
            <button onClick={handleAddComment}>Dodaj</button>
        </div>
    );
};

export default PostDetail;
