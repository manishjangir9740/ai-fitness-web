import React from 'react';
import './Exercises.css'; // Import custom styles

function Exercises() {
    const exercises = [
        {
          title: "Walking",
          description: "Walking is one of the simplest and most accessible exercises for improving cardiovascular health and enhancing mood. It helps in weight management and strengthens bones and muscles. Start by walking 5-10 minutes daily and gradually increase to at least 30 minutes. To maximize benefits, maintain a brisk pace and include inclines or hills in your routine. Always wear comfortable shoes to support your feet.",
          image: "/images/walking.jpg", // Replace with your actual image paths
        },
        {
          title: "Interval Training",
          description: "Interval training alternates between high and low-intensity activities, making it an excellent way to boost endurance and burn calories efficiently. For instance, during a walk or run, increase your speed for 1-2 minutes, then return to a steady pace for 2-4 minutes. This method improves cardiovascular fitness and can be tailored to your fitness level. Always warm up before starting and cool down afterward to avoid injuries.",
          image: "/images/intervals.webp",
        },
        {
          title: "Squats",
          description: "Squats are a compound exercise targeting multiple muscle groups, including quads, hamstrings, glutes, and core. They help improve lower body strength, balance, and posture. Stand with feet shoulder-width apart, keep your back straight, and bend your knees as if sitting in a chair. Avoid letting your knees go beyond your toes. Progress by adding weights once you master the bodyweight version. Remember to breathe evenly and engage your core throughout the movement.",
          image: "/images/squarts.jpg",
        },
        {
          title: "Lunges",
          description: "Lunges enhance lower body strength and stability by engaging quads, glutes, hamstrings, and calves. They also improve balance and coordination. Step forward with one leg, keeping your torso upright, and bend both knees to form a 90-degree angle. Ensure your front knee doesn’t extend beyond your toes. Once comfortable, challenge yourself with side lunges or add weights. Focus on controlled movements to maximize muscle activation.",
          image: "/images/Lunges.jpg",
        },
        {
          title: "Push-Ups",
          description: "Push-ups are a classic bodyweight exercise for building upper body and core strength. They target the chest, shoulders, triceps, and abdominal muscles. Begin in a plank position with hands slightly wider than shoulders. Lower your body until your chest nearly touches the ground, keeping your core tight and back straight. If this is too challenging, start with your knees on the ground or lean against a stable surface. Gradually increase the intensity as you build strength.",
          image: "/images/Push-Ups.jpg",
        },
        {
          title: "Crunches",
          description: "Crunches are an effective exercise for strengthening the abdominal muscles and improving core stability. Lie on your back with your knees bent and feet flat on the floor. Place your hands behind your head for support, and lift your head, shoulders, and upper back off the ground. Avoid pulling on your neck to prevent strain. For added difficulty, lift your feet off the floor or perform twists to engage the obliques. Maintain smooth and controlled movements.",
          image: "/images/crunches.jpg",
        },
        {
          title: "Bent-Over Rows",
          description: "Bent-over rows target the upper back, biceps, and shoulders, helping improve posture and upper body strength. Hold dumbbells or a barbell, bend your knees slightly, and hinge at your hips. Keep your back straight and core engaged. Pull the weights towards your torso by bending your elbows, squeezing your shoulder blades together at the top. Lower the weights slowly and repeat. Begin with lighter weights to master the form and gradually increase the load.",
          image: "/images/bent.jpg",
        },
      ];
      

  return (
    <div className="exercises-container">
      <h1 className="exercises-header">Exercises</h1>
      <p className="exercises-intro">
      Done right, these seven exercises can give you results you can see and feel. Watch the form shown by the trainer in the pictures. Good technique is essential. Consistency is key – aim for regular practice, and you’ll start noticing improvements in strength and endurance. Focus on your breathing as you perform each move, as it helps to stabilize your body and maintain proper form. Don’t rush through the exercises; it’s more effective to do fewer reps with proper form than more reps with poor technique. Remember, quality always beats quantity in your fitness journey!
      </p>
      <div className="exercises-grid">
        {exercises.map((exercise, index) => (
          <div key={index} className="exercise-card">
            <img src={exercise.image} alt={exercise.title} className="exercise-image" />
            <h2 className="exercise-title">{exercise.title}</h2>
            <p className="exercise-description">{exercise.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exercises;
