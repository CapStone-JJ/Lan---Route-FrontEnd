import TextInput from "./textInput";
import Button from "./button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserSearch } from "../../slice/userSlice";
import { clearPostSearch } from "../../slice/postsSlice";
import { useNavigate } from "react-router-dom";
import { useSearchPostQuery } from "../../api/posts";
import { useSearchNameQuery } from "../../api/auth";

function SearchBar() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Use the search query hooks
    const { data: postResults, isLoading: postLoading } = useSearchPostQuery(text);
    const { data: nameResults, isLoading: nameLoading } = useSearchNameQuery(text);

    const onSubmit = () => {
        setText("");
        navigate("/");
    };

    const onClear = () => {
        dispatch(clearUserSearch());
        dispatch(clearPostSearch());
        navigate("/");
    };

    // Check if results are undefined before accessing
    const hasResults = postResults || nameResults;

    return (
        <div className="searchWrap">
            {(postLoading || nameLoading) && <div className="searchLoad">Loading...</div>}
            <div className="searchBar">
                <TextInput placeholder="Search.." type="text" vl={text} chg={setText} />
                <Button click={onSubmit} theme="submit">
                    <span>SEARCH</span>
                </Button>
                {hasResults && <div className="clear" onClick={onClear}>Clear</div>}
            </div>
        </div>
    );
}

export default SearchBar;


