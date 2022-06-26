import { Link } from "react-router-dom";

function PostList({ posts, deletePost }) {
    const truncate = (paragraph) => {
        if (paragraph.length > 200) {
            return paragraph.substr(0, 200) + "... ";
        }
        return paragraph;
    }

    return (
        <div className="post-list">
            {posts.map((paragraph) => (
                <div className="post-preview" key={paragraph.id}>
                    <Link to={`/posts/${paragraph.id}`} key={ paragraph.id }>
                        <div>
                            <h3>{paragraph.title}</h3>
                            <p>{truncate(paragraph.body)}</p>
                            <p className="preview-author">By {paragraph.author}</p>
                        </div>
                    </Link>
                    <div className="preview-actions">
                        <button onClick={() => deletePost(paragraph.id)}>
                            <i className="material-icons">delete</i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostList;