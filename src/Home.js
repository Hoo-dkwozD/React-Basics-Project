import PostList from './PostList';
import MessageCard from './MessageCard';
import useFetch from './useFetch';

function Home() {
    const { data: posts, isPending, e, setData: setPosts } = useFetch("http://localhost:5000/posts");

    const deletePost = (id) => {
        const newPosts = posts.filter(post => post.id !== id);
        fetch("http://localhost:5000/deletepost/" + id, {
            method: "DELETE"
        });
        setPosts(newPosts);
    }

    return (
        <div className="home">
            <h2>Homepage</h2>
            { e && <MessageCard iconName="sync_problem" message={e} /> }
            { isPending && <MessageCard iconName="loop" message="Loading ... " /> }
            { posts && <PostList posts={posts} deletePost={deletePost} /> }
        </div>
    );
}

export default Home;