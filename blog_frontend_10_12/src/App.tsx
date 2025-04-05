import { Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

const App = () => (
    <div>
        <nav>
            <Link to="/">Strona główna</Link>
        </nav>
        <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
    </div>
);

export default App;
