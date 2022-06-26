import { useState } from "react";
import { useHistory } from "react-router-dom";
import MessageCard from "./MessageCard";

function Create() {
    const [author, setAuthor] = useState("Albert Camus");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [e, setE] = useState(null);
    const [data, setData] = useState(null);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const blog = { author, title, body };

        setIsPending(true);

        fetch("http://localhost:5000/addpost", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        }).then((res) => {
            if (!res.ok) {
                throw Error("Data could not be posted");
            }
            return res.json();
        }).then((data) => {
            setData(data);
            setIsPending(false);
            setE(null);
            history.push("/");
        }).catch((err) => {
            if (err.name !== "AbortError") {
                setData([]);
                setIsPending(false);
                setE(err.message);
                console.error(err);
            }
        });
    }

    return (
        <div className="create">
            <h2>New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title: </label>
                    <input type="text" value={ title } onChange={ (e) => setTitle(e.target.value) } required />
                    <label>Author: </label>
                    <select value={ author } onChange={ (e) => setAuthor(e.target.value) } required>
                        <option value="Albert Camus">Albert Camus</option>
                        <option value="Jean-Paul Sartre">Jean-Paul Sartre</option>
                        <option value="Siddharta Gautama">Siddharta Gautama</option>
                        <option value="Friedrich Nietzsche">Friedrich Nietzsche</option>
                        <option value="Simone de Beauvoir">Simone de Beauvoir</option>
                    </select>
                </div>
                <label>Body: </label>
                <textarea value={ body } onChange={ (e) => setBody(e.target.value) } required></textarea>
                { e && <MessageCard iconName="sync_problem" message={e}/>}
                { !isPending && <input type="submit" value="Add Blog" /> }
                { isPending && <input type="submit" disabled value="Adding ..." /> }
            </form>
        </div>
    );
}

export default Create;