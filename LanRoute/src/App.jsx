import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return <>
  <div>
    <Routes>
      <Route path = "/" element = {<Login/>} />
      <Route path = "/Login" element = {<Login/>} />
      <Route path = "/Register" element = {<Register/>} />

      
    </Routes>
  </div>
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
