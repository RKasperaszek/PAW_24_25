import "../../public/styles/main.sass";

export default function Navigation() {
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/categories">Categories</a></li>
                <li><a href="/post">Posts</a></li>
            </ul>
        </nav>
    )
}