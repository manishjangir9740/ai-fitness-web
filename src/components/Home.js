import React, { useState } from 'react';
import './Home.css'; // Import the CSS file for styling

function Home({ videoFile, setVideoFile, exerciseType, setExerciseType, handleStartExercise }) {
  const [isVideoActive, setIsVideoActive] = useState(false);

  // Start video stream from webcam
  const startVideo = () => {
    setIsVideoActive(true);
  };

  // Stop video stream
  const stopVideo = () => {
    setIsVideoActive(false);
    setVideoFile(null); // Clear any selected video file
    setExerciseType("Push-Up"); // Reset exercise type to default

    // Make API call to stop exercise
    fetch("http://127.0.0.1:5000/stop_exercise", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message); // Show success message
        handleStartExercise(); // Disable any ongoing exercise
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="home-container">
      {/* Background video */}
      <div className="video-background">
      <video autoPlay muted loop>
  <source src="/images/body.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
      </div>

      <div className="content">
        <h1 className="title">Exercise Tracker</h1>

        {/* Exercise Form */}
        <div className="form-group">
          <label>Exercise Type: </label>
          <select value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
            <option value="Push-Up">Push-Up</option>
            <option value="Squat">Squat</option>
            <option value="Sit-Up">Sit-Up</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Video: </label>
          <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} />
          <p>{videoFile ? videoFile.name : "No file chosen"}</p>
        </div>

        <button onClick={handleStartExercise} disabled={!isVideoActive} className="action-button start-btn">
          Start Exercise
        </button>

        {/* Stop Camera Section */}
        <div>
          {!isVideoActive ? (
            <button onClick={startVideo} className="action-button start-btn">
              Start Camera
            </button>
          ) : (
            <button onClick={stopVideo} className="action-button stop-btn">
              Stop Camera
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
