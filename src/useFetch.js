import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [e, setE] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
        .then((res) => {
            if (!res.ok) {
                throw Error("Data could not be retrieved");
            }
            return res.json();
        })
        .then((data) => {
            setData(data);
            setIsPending(false);
            setE(null);
        })
        .catch((err) => {
            if (err.name !== "AbortError") {
                setData([]);
                setIsPending(false);
                setE(err.message);
                console.error(err);
            }
        });

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, e, setData };
}

export default useFetch;