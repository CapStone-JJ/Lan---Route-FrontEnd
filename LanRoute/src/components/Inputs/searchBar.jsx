import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserSearch } from "../../slice/userSlice";
import { clearPostSearch } from "../../slice/postsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useLazySearchPostQuery } from "../../api/posts";
import { useLazySearchNameQuery } from "../../api/auth";
import Button from "./button";
import SearchInput from "./searchInput";
import formatDate from '../Inputs/formatDate';
import { Link } from "react-router-dom";
import "../Styles/searchBar.css"

function SearchBar() {
    const [text, setText] = useState("");
    const [showClearButton, setShowClearButton] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const results = useSelector((state) => state.user.results);
    const [isSuccessPost, setIsSuccessPost] = useState(false);
    const [isSuccessName, setIsSuccessName] = useState(false);
    const [dataPost, setDataPost] = useState([]);
    const [dataName, setDataName] = useState([]);

    const selectUserCredentials = (state) => state.user.credentials;

    // Then, use this selector in your component:
    const userId = useSelector((state) => selectUserCredentials(state)?.user?.userId);
    const username = useSelector((state) => selectUserCredentials(state)?.user?.username);


    const [triggerPost, { isLoading: postLoading }] = useLazySearchPostQuery();
    const [triggerName, { isLoading: nameLoading }] = useLazySearchNameQuery();
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get("q");
      if (query) {
        setText(query);
        onSubmit(query);
      }
    }, [location.search]);
  
    const onSubmit = async (query) => {
      try {
        const { data, isSuccess } = await triggerPost(query);
        if (isSuccess) {
          setIsSuccessPost(true);
          setDataPost(data);
          setShowClearButton(true);
        } else {
          console.error("Error fetching data:", error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  
      try {
        const { data: nameData, isSuccess: nameIsSuccess } = await triggerName(query);
        if (nameIsSuccess) {
          setIsSuccessName(true);
          setDataName(nameData);
          setShowClearButton(true);
        } else {
          console.error("Error fetching name data:", error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const onClear = () => {
      dispatch(clearUserSearch());
      dispatch(clearPostSearch());
      setText(""); // Clear search text
      setShowClearButton(false); // Hide clear button
      setIsSuccessPost(false); // Reset success states
      setIsSuccessName(false);
      setDataPost([]); // Clear search results
      setDataName([]);
    };
  
    const handleSearch = () => {
      navigate(`?q=${text}`);
      onSubmit(text);
    };
  
    return (
      <div className="searchWrap">
        {(postLoading || nameLoading) && (
          <div className="searchLoad">Loading...</div>
        )}
        <div className="searchBar">
          <SearchInput value={text} onChange={(e) => setText(e.target.value)} className="searchInput" />
          <Button click={handleSearch} theme="submit" className="searchButton">
            <span>SEARCH</span>
          </Button>
          {showClearButton && (
            <div className="clear" onClick={onClear}>
              Clear
            </div>
          )}
          {isSuccessPost && dataPost.length === 0 && isSuccessName && dataName.length === 0 && (
            <div className="noResults">No results found.</div>
          )}
          {isSuccessPost && dataPost.map((result) => (
            <div key={result.id} className="postResult">
              <Link to={{ pathname: `/posts/${result.id}`, state: { userId: result.userId }}}>
                <p>{result.content}</p>
                <p>{formatDate(result.createdAt)}</p>
              </Link>
            </div>
          ))}
          {isSuccessName && dataName.map((result) => (
            <div key={result.username} className="nameResult">
              <Link to={{ pathname: `/profile/${result.username}`, state: { userId: result.userId }}}>
                <p>{result.username}</p>
                <p>{result.bio}</p>
                <p>{result.location}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
}
  
export default SearchBar;
