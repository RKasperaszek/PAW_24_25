import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


type Comment = { id: number, text: string };
type Post = { id: number, title: string, body: string, comments: Comment[] };

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [comment, setComment] = useState("");

    const fetchPost = () => {
        axios.get(`http://localhost:3000/posts/${id}`).then(res => {
            setPost(res.data);
        });
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`http://localhost:3000/posts/${id}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: comment }),
        });
        setComment("");
        fetchPost();
    };
    {console.log(comment)}

    if (!post) return <div>Ładowanie...</div>;

    return (
        <div className="post-container">
            <h2>{post.title}</h2>
            <p>{post.body}</p>

            <div className="comments-section">
                <h3>Komentarze</h3>
                <ul>
                    {post.comments.map(c => <li key={c.id}>{c.text}</li>)}
                </ul>
                <form onSubmit={handleSubmit} className="comment-form">
                    <textarea
                        className="comment-input"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Dodaj komentarz"
                    />
                    <button type="submit" className="comment-button">Dodaj</button>
                </form>

            </div>
        </div>
    );
};

export default PostDetail;
