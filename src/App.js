import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import ViewMore from "./components/ViewMore";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <div className="container my-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about/*" element={<About />} />
              <Route path="viewmore/*" element={<ViewMore />} />
              <Route path="login/*" element={<Login />} />
              <Route path="signup/*" element={<SignUp />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
