import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Exercises from './components/Exercises';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [exerciseType, setExerciseType] = useState("Push-Up");

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleStartExercise = () => {
    const formData = new FormData();
    formData.append("exercise_type", exerciseType);
    if (videoFile) {
      formData.append("video_source", videoFile);
    }

    fetch("http://127.0.0.1:5000/start_exercise", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          alert("Error: " + data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'space-around', margin: 0, padding: 0 }}>
            <li className="btn"><Link to="/" style={linkStyle}>Home</Link></li>
            <li className="btn"><Link to="/about" style={linkStyle}>About</Link></li>
            <li className="btn"><Link to="/exercises" style={linkStyle}>Exercises</Link></li>
            <li className="btn"><Link to="/contact" style={linkStyle}>Contact</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Home videoFile={videoFile} setVideoFile={setVideoFile} exerciseType={exerciseType} setExerciseType={setExerciseType} handleStartExercise={handleStartExercise} />} />
          <Route path="/about" element={<About />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

// Styling for navigation links
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px',
};

export default App;
