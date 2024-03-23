import "./components/Styles/themes.css"
import { Routes, Route, useParams } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PostPage from "./components/Posts/post";
import MainFeed from "./components/Main/mainFeed";
import MainNotifications from "./components/Main/mainNotifications";
import MainFriends from "./components/Main/mainFriends";
import ThemePage from "./components/Themes/themePage";
import { ThemeProvider } from "./components/Themes/themeProvider";
import MainSearch from "./components/Main/MainSearch";
import MainUserProfile from "./components/Main/mainUserProfile";
import MainPlaylists from "./components/Main/mainPlaylists";
import MainPost from "./components/Main/mainPost";

function App() {
  return (
    <ThemeProvider>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/feed" element={<MainFeed />} />
          <Route path="/posts/:postId" element={<MainPost />} />
          <Route path="/notifications" element={<MainNotifications />} />
          <Route path="/friends" element={<MainFriends />} />
          <Route path="/themePage" element={<ThemePage />} />
          <Route path="/searchBar" element={<MainSearch />} />
          <Route path="/profile/:username" element={<MainUserProfile />} />
          <Route path="/playlists" element={<MainPlaylists />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
