import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import MessageCard from "./MessageCard";

function PostDetails() {
    const { id } = useParams();
    const { data: post, isPending, e } = useFetch(`http://localhost:5000/posts/${ id }`);
    const history = useHistory();

    const handleDelete = () => {
        console.log(post[0].id);
        fetch("http://localhost:5000/deletepost/" + post[0].id, {
            method: "DELETE"
        })
        .then(() => {
            history.push("/");
        });
    }

    return (
        <div className="post-details">
            { e && <MessageCard iconName="sync_problem" message={e} /> }
            { isPending && <MessageCard iconName="loop" message="Loading ... " /> }
            { post && (
                <>
                <div className="details-header">
                    <h2>{ post[0].title }</h2>
                    <button onClick={handleDelete}><i className="material-icons">delete</i></button>
                </div>
                <div className="details-card">
                    <p className="details-author">Written by { post[0].author }</p>
                    <p>{ post[0].body }</p>
                </div>
                </>
            )}
        </div>
    );
}

export default PostDetails;