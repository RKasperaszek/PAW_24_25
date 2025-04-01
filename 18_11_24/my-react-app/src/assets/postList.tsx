import { Link } from 'react-router-dom';

const PostList = ({ posts }: { posts: any[] }) => {
    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h3><Link to={`/post/${post.id}`}>{post.title}</Link></h3>
                </div>
            ))}
        </div>
    );
};

export default PostList;
