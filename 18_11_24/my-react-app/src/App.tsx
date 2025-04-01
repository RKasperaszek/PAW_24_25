import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Post from "./pages/post";
import Categories from "./pages/categories";
import SinglePost from "./pages/singlePost";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<Post />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/post/:id" element={<SinglePost />} />
            </Routes>
        </>
    );
}

export default App;
