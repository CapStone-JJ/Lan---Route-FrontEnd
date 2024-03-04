import { useState, useEffect } from "react";
import TextInput from "../Inputs/textInput";
import { useAddPostMutation } from "../../api/posts";
import { useGetTagQuery } from "../../api/tags";
import Button from "../Inputs/button";
import { useDispatch } from "react-redux";

function CreatePostForm() {
    const [addPost, { isLoading: sendPost }] = useAddPostMutation();
    const { data: tagsData, isLoading: tagsLoading, isError: tagsError } = useGetTagQuery();
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [tags, setTags] = useState([]);
    const [change, setChange] = useState(false);
    const dispatch = useDispatch();

    const toggleTag = (tag) => {
        const result = tags;
        if (result.includes(tag)) {
            const index = result.indexOf(tag);
            result.splice(index, 1);
        } else {
            result.push(tag);
        }

        setTags(result);
        setChange(!change);
    };

    const onSubmit = async () => {
        if (text.length >= 3) {
            await addPost({
                content: text,
                published: true
            }).then(() => {
                setText("");
                setTags([]);
                dispatch({
                    type: "success",
                    text: "Post Created!",
                    active: true
                });
            }).catch(() => {
                dispatch({
                    type: "fail",
                    text: "Error posting",
                    active: true
                });
            });
        } else {
            setError("Not enough characters to submit post");
        }
    };

    useEffect(() => {

    }, [change]);

    return (
        <div className={"createForm"}>
            <h1>Create a Post</h1>
            <TextInput type={"text"} vl={text} chg={setText} />
            <h3>Add Tags</h3>
            <div className={"tags"}>
                {tagsLoading ? (
                    <div>Loading tags...</div>
                ) : tagsError ? (
                    <div>Error loading tags</div>
                ) : (
                    tagsData.map((i) =>
                        <div key={i.id} className={"tag"} onClick={() => toggleTag(i)} style={{ border: tags.includes(i) ? "3px solid blue" : "none" }}>{i.name}</div>
                    )
                )}
            </div>
            <Button click={onSubmit} vl={"SUBMIT"} theme={"submit"} />
            <h1 style={{ "color": "red" }}>{error}</h1>
        </div>
    );
}

export default CreatePostForm;

