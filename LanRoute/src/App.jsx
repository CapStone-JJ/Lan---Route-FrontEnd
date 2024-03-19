import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PostPage from "./components/Posts/post";
import MainFeed from "./components/Main/mainFeed";
import MainProfile from "./components/Main/mainProfile";
import Notifications from "./components/Notifications";
import FriendsPage from './components/Friends/FriendsPage';

const PostPageWrapper = () => {
  const { postId } = useParams();

  return <PostPage postId={parseInt(postId)} />;
};

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/mainFeed" element={<MainFeed />} />
          <Route path="/posts/:postId" element={<PostPageWrapper />} />
          <Route path="/mainProfile" element={<MainProfile />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/friends" element={<FriendsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
