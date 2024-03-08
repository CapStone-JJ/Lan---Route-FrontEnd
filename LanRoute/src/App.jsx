import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import PostPage from "./components/Posts/post";
import MainFeed from "./components/Main/mainFeed";
import MainProfile from "./components/Main/mainProfile";

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
        </Routes>
      </div>
    </>
  );
}

export default App;
