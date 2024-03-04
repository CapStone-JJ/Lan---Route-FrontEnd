import TextInput from "./TextInput";
import Button from "./button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../redux/api/api";
import { clearUserSearch } from "../../slice/userSlice";
import { clearPostSearch } from "../../slice/postsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [text, setText] = useState("");
    const results = useSelector(state => state.data.results);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [trigger, { isLoading }] = api.endpoints.searchPost.useLazyQuery();

    const onSubmit = async () => {
        try {
            await trigger(text);
            setText("");
            navigate("/");
        } catch (err) {
            console.error("Error searching:", err);
        }
    };

    const onClear = () => {
        dispatch(clearUserSearch()); // Dispatch clearUserSearch action
        dispatch(clearPostSearch()); // Dispatch clearPostSearch action
        navigate("/");
    };

    return (
        <div className="searchWrap">
            {isLoading && <FontAwesomeIcon className="searchLoad" icon={faSpinner} size="2x" spin />}
            <div className="searchBar">
                <TextInput placeholder="Search.." type="text" vl={text} chg={setText} />
                <Button click={onSubmit} theme="submit">
                    <span>SEARCH</span>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
                {results.search && (
                    <FontAwesomeIcon className="clear" icon={faTimes} onClick={onClear} size="2x" />
                )}
            </div>
        </div>
    );
}

export default SearchBar;
