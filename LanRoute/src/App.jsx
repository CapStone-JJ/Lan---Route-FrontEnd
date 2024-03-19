import "./components/Styles/themes.css"
import { Routes, Route, useParams } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PostPage from "./components/Posts/post";
import MainFeed from "./components/Main/mainFeed";
import MainProfile from "./components/Main/mainProfile";
import Notifications from "./components/Notifications";
import ThemePage from "./components/Themes/themePage";
import { ThemeProvider } from "./components/Themes/themeProvider";
import SearchBar from "./components/Inputs/searchBar";
import MainUserProfile from "./components/Main/mainUserProfile";
import WidgetSelectionPage from "./components/Widgets/widgets/widgetsPage";

const PostPageWrapper = () => {
  const { postId } = useParams();

  return <PostPage postId={parseInt(postId)} />;
};

function App() {
  return (
    <ThemeProvider>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/mainFeed" element={<MainFeed />} />
          <Route path="/posts/:postId" element={<PostPageWrapper />} />
          <Route path="/mainProfile" element={<MainProfile />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/themePage" element={<ThemePage />} />
          <Route path="/searchBar" element={<SearchBar />} />
          <Route path="/profile/:username" element={<MainUserProfile />} />
          <Route path="/widgets" element={<WidgetSelectionPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
