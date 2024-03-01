import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Feed" element={<Feed />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
