import os
import cv2
import argparse
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

ap = argparse.ArgumentParser()
ap.add_argument("-t", "--exercise_type", type=str, help='Type of activity to do', required=True)
ap.add_argument("-vs", "--video_source", type=str, help='Path to the video file', required=False)
args = vars(ap.parse_args())

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose


if args["video_source"] is not None:
    cap = cv2.VideoCapture(os.path.join("Exercise_Videos", args["video_source"]))
else:
    cap = cv2.VideoCapture(0)  # webcam

cap.set(3, 800)  # width
cap.set(4, 480)  # height

# Setup MediaPipe Pose
with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    counter = 0  # movement of exercise
    status = True  # state of move

    while cap.isOpened():
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

        try:
            landmarks = results.pose_landmarks.landmark
            counter, status = TypeOfExercise(landmarks).calculate_exercise(
                args["exercise_type"], counter, status)
        except Exception as e:
            print(f"Error processing frame: {e}")

        frame = score_table(args["exercise_type"], frame, counter, status)

        # Render detections (for landmarks)
        mp_drawing.draw_landmarks(
            frame,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=2),
            mp_drawing.DrawingSpec(color=(174, 139, 45), thickness=2, circle_radius=2),
        )

        cv2.imshow('Video', frame)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
