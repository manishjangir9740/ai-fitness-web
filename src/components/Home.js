import React, { useState, useEffect } from 'react';
import './Home.css'; // Import the CSS file for styling

function Home({ videoFile, setVideoFile, exerciseType, setExerciseType, handleStartExercise }) {
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [isExercising, setIsExercising] = useState(false);

  // Poll for exercise count
  useEffect(() => {
    if (isExercising) {
      const interval = setInterval(() => {
        fetch("http://127.0.0.1:5000/get_count")
          .then((response) => response.json())
          .then((data) => {
            setExerciseCount(data.count);
            if (!data.active) {
              setIsExercising(false);
              setIsVideoActive(false);
            }
          })
          .catch((error) => console.error("Error:", error));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isExercising]);

  // Start video stream and exercise
  const startExercise = () => {
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
          setIsVideoActive(true);
          setIsExercising(true);
          setExerciseCount(0);
        } else {
          alert("Error: " + data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Stop video stream
  const stopVideo = () => {
    setIsVideoActive(false);
    setIsExercising(false);

    // Make API call to stop exercise
    fetch("http://127.0.0.1:5000/stop_exercise", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Exercise stopped! Total count: ${data.final_count}`);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="home-container">
      {/* Background video */}
      {!isVideoActive && (
        <div className="video-background">
          <video autoPlay muted loop>
            <source src="/images/body.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className="content">
        <h1 className="title">AI Fitness Tracker</h1>

        {/* Exercise count display */}
        {isExercising && (
          <div className="count-display">
            <h2>Count: {exerciseCount}</h2>
          </div>
        )}

        {/* Video stream display */}
        {isVideoActive && (
          <div className="video-container">
            <img 
              src="http://127.0.0.1:5000/video_feed" 
              alt="Exercise Video Stream"
              style={{ width: '100%', maxWidth: '800px', borderRadius: '10px' }}
            />
          </div>
        )}

        {!isVideoActive && (
          <>
            {/* Exercise Form */}
            <div className="form-group">
              <label>Exercise Type: </label>
              <select value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
                <option value="push-up">Push-Up</option>
                <option value="squat">Squat</option>
                <option value="sit-up">Sit-Up</option>
                <option value="pull-up">Pull-Up</option>
                <option value="walk">Walk</option>
              </select>
            </div>

            <div className="form-group">
              <label>Upload Video (Optional): </label>
              <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />
              <p>{videoFile ? videoFile.name : "No file chosen - will use webcam"}</p>
            </div>

            <button onClick={startExercise} className="action-button start-btn">
              Start Exercise
            </button>
          </>
        )}

        {/* Stop Exercise Button */}
        {isVideoActive && (
          <button onClick={stopVideo} className="action-button stop-btn">
            Stop Exercise
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
