import navigation from '../assets/navigation';

function Home() {
    return (
        <>
            {navigation()}
            <div>
                <h1 className="title">Home</h1>
                <p id="message">
                    This is the home page.
                </p>
            </div>
        </>
    )
}

export default Home;