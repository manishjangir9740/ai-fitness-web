import os
import cv2
import base64
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from werkzeug.utils import secure_filename
from utils import score_table
import mediapipe as mp
from body_part_angle import BodyPartAngle
from types_of_exercise import TypeOfExercise

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import tensorflow as tf
import logging
logging.getLogger('tensorflow').setLevel(logging.ERROR)
import absl.logging
absl.logging.set_verbosity(absl.logging.ERROR)

app = Flask(__name__)
CORS(app)

# Set up a folder to save uploaded videos
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Set allowed file extensions
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv'}

# Global variables to manage exercise state
is_exercise_active = False
cap = None
exercise_type_global = "push-up"
counter_global = 0
status_global = True

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

def generate_frames():
    global is_exercise_active, cap, exercise_type_global, counter_global, status_global
    
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap is not None and cap.isOpened() and is_exercise_active:
            ret, frame = cap.read()
            if not ret:
                break

            frame = cv2.resize(frame, (800, 480), interpolation=cv2.INTER_AREA)
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame.flags.writeable = False

            # Make detection
            results = pose.process(frame)
            frame.flags.writeable = True
            frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

            # Check if pose landmarks are detected
            if results.pose_landmarks:
                try:
                    landmarks = results.pose_landmarks.landmark
                    counter_global, status_global = TypeOfExercise(landmarks).calculate_exercise(
                        exercise_type_global, counter_global, status_global)
                except Exception as e:
                    print(f"Error processing frame: {e}")

            frame = score_table(exercise_type_global, frame, counter_global, status_global)

            # Render detections
            mp_drawing.draw_landmarks(
                frame,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=2),
                mp_drawing.DrawingSpec(color=(174, 139, 45), thickness=2, circle_radius=2),
            )

            # Encode frame to JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/start_exercise', methods=['POST'])
def start_exercise():
    global is_exercise_active, cap, exercise_type_global, counter_global, status_global

    try:
        # Get exercise type from the form
        exercise_type = request.form.get('exercise_type')
        if not exercise_type:
            return jsonify({'error': 'Exercise type is required'}), 400

        exercise_type_global = exercise_type.lower()
        counter_global = 0
        status_global = True

        print(f"Received exercise type: {exercise_type}")

        # Get the uploaded video file
        video_file = request.files.get('video_source')
        if video_file:
            print(f"Received video file: {video_file.filename}")
            if video_file.filename == '':
                return jsonify({'error': 'No selected file'}), 400
            if video_file and allowed_file(video_file.filename):
                filename = secure_filename(video_file.filename)
                video_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                video_file.save(video_path)
                cap = cv2.VideoCapture(video_path)
            else:
                return jsonify({'error': 'Invalid file type'}), 400
        else:
            print("No video file received, using webcam")
            cap = cv2.VideoCapture(0)

        if not cap.isOpened():
            return jsonify({'error': 'Failed to open video source'}), 500

        cap.set(3, 800)  # width
        cap.set(4, 480)  # height

        # Set exercise state to active
        is_exercise_active = True

        return jsonify({'message': 'Exercise started successfully', 'counter': counter_global}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': f"An error occurred: {e}"}), 500


@app.route('/stop_exercise', methods=['POST'])
def stop_exercise():
    global is_exercise_active, cap, counter_global
    try:
        if is_exercise_active:
            is_exercise_active = False
            if cap is not None:
                cap.release()
                cap = None
                print("Exercise stopped and video capture released.")
            return jsonify({'message': 'Exercise stopped successfully', 'final_count': counter_global}), 200
        else:
            return jsonify({'message': 'No exercise is currently active'}), 400
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': f"An error occurred: {e}"}), 500

@app.route('/get_count', methods=['GET'])
def get_count():
    global counter_global, is_exercise_active
    return jsonify({'count': counter_global, 'active': is_exercise_active}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
