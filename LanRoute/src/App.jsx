import "./App.css";
import { Routes, Route, useParams } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';
import PostPage from "./components/Posts/post";

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
          <Route path="/Feed" element={<Feed />} />
          <Route path="/posts/:postId" element={<PostPageWrapper />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
