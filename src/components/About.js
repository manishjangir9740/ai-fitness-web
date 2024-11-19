import React from 'react';
import './About.css'; // Import custom styles

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
      </div>
      <div className="about-content">
        <p>
          Welcome to our Exercise Tracker App! This innovative platform is designed to help users 
          track their workouts in real-time using advanced computer vision technology. 
          Whether you're performing push-ups, squats, sit-ups, or other exercises, our app provides 
          precise tracking and feedback to improve your form and ensure efficient workouts.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Real-time exercise tracking using computer vision</li>
          <li>Support for multiple exercises like push-ups, squats, and sit-ups</li>
          <li>Integration with webcam or uploaded video</li>
          <li>Provides feedback to improve your form and technique</li>
          <li>User-friendly interface with intuitive controls</li>
        </ul>
        <h2>Our Mission</h2>
        <p>
          Our mission is to revolutionize fitness by making it accessible and engaging for everyone. 
          By leveraging cutting-edge technology, we aim to provide tools that empower individuals to 
          achieve their fitness goals with precision and ease.
        </p>
      </div>
    </div>
  );
}

export default About;
