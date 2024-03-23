import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserSearch } from "../../slice/userSlice";
import { clearPostSearch } from "../../slice/postsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useLazySearchPostQuery } from "../../api/posts";
import { useLazySearchNameQuery } from "../../api/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import formatDate from "../Inputs/formatDate";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import '../Styles/searchBar.css'

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
      <Paper component="div" elevation={3} className="searchBar">
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          placeholder="Search..."
          className="searchInput"
        />
        <div className="buttonContainer"> {/* Container for centering buttons */}
          <Button onClick={handleSearch} variant="contained" color="primary" className="searchButton">
            SEARCH
          </Button>
        </div>
        {showClearButton && (
          <Typography variant="body2" className="clear" onClick={onClear}>
            Clear
          </Typography>
        )}
        {isSuccessPost && dataPost.map((result, index) => (
          <React.Fragment key={result.id}>
            <Card elevation={1} className="postResult">
              <CardContent>
                <Link to={{ pathname: `/posts/${result.id}`, state: { userId: result.userId }}}>
                  <Typography variant="body1">{result.content}</Typography>
                  <Typography variant="body2">{formatDate(result.createdAt)}</Typography>
                </Link>
              </CardContent>
            </Card>
            {index !== dataPost.length - 1 && <Divider />} {/* Add divider if not the last result */}
          </React.Fragment>
        ))}
        {isSuccessName && dataName.map((result, index) => (
          <React.Fragment key={result.username}>
            <Card elevation={1} className="nameResult">
              <CardContent>
                <Link to={{ pathname: `/profile/${result.username}`, state: { userId: result.userId }}}>
                  <Typography variant="body1">{result.username}</Typography>
                  <Typography variant="body2">{result.bio}</Typography>
                  <Typography variant="body2">{result.location}</Typography>
                </Link>
              </CardContent>
            </Card>
            {index !== dataName.length - 1 && <Divider />} {/* Add divider if not the last result */}
          </React.Fragment>
        ))}
      </Paper>
    </div>
  );
}

export default SearchBar;

