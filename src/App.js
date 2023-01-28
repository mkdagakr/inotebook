import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>

          <Navbar />

          <div className="container">

            <Routes>
              <Route exact path="/" element={<LogIn />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/about" element={<About />} />
            </Routes>

          </div>

        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
