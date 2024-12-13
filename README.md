# P3tskit API Documentation

The following APIs are designed for use within the P3tskit project. These APIs serve various functions for managing pet health diagnoses, including uploading image data, processing pet diseases, and managing user information.

## 1. List of API Endpoints

### a) User Registration
- **URL**: `/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string (must be valid email format)",
    "password": "string"
  }
  
### b) User Login
- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }

### c) Change Password User
- **URL**: `/change-password`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "new_password": "string"
  }
  
### d) Upload Pet Diagnosis
- **URL**: `/diagnose`
- **Method**: `POST`
- **Headers**:
  - `Authorization`: `Bearer <JWT_Token>`
  - `Content-Type`: `multipart/form-data`
- **Request Body**:
  - `file`: `<binary_image_file>`
- **Response**:
  - **Success (200 - OK)**:
    ```json
    {
      "error": false,
      "message": "Diagnosis processed successfully.",
      "data": {
        "diseaseName": "string",
        "imageUrl": "string",
        "userId": "string",
        "createdAt": "timestamp"
      }
    }
    ```
  - **Error (400 - Bad Request)**:
    ```json
    {
      "error": true,
      "message": "File is required."
    }
    ```
  - **Error (500 - Internal Server Error)**:
    ```json
    {
      "error": true,
      "message": "Error processing diagnosis."
    }
    ```


    # PetMed AI - Cloud Computing Module

PetMed AI is an innovative application designed to assist pet owners in diagnosing external diseases in dogs and cats using machine learning. The cloud computing module is a critical component that handles data storage, model deployment, and backend services to ensure seamless user experience and scalability.

## Table of Contents
- [Overview](#overview)
- [Cloud Architecture](#cloud-architecture)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Setup and Deployment](#setup-and-deployment)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Overview
The cloud computing module of PetMed AI manages:
1. Deployment of machine learning models for disease detection.
2. Secure storage of user and pet data.
3. Scalable backend infrastructure for handling app traffic.
4. Integration with third-party services like Firebase for authentication.

## Cloud Architecture
The architecture leverages:
- **Compute:** Google Cloud Platform (GCP) services, including Cloud Run for deploying containerized applications.
- **Storage:** Google Cloud Storage for storing user-uploaded images.
- **Databases:** Firestore for real-time database management.
- **Authentication:** Firebase Authentication for secure login and registration.
- **Machine Learning:** Deployed models using Vertex AI for efficient image classification.

## Key Features
1. **Model Deployment:** A pre-trained machine learning model for diagnosing pet diseases.
2. **Scalability:** Auto-scaling backend using GCP Cloud Run.
3. **Secure Data Management:** Encrypted storage of images and sensitive user data.
4. **Real-time Notifications:** Integration with Firebase Cloud Messaging (FCM) for updates.

## Technology Stack
- **Backend:** Node.js, Express.js
- **Cloud Platform:** Google Cloud Platform (GCP)
- **Database:** Firestore (NoSQL)
- **Authentication:** Firebase Authentication
- **Image Storage:** Google Cloud Storage
- **Machine Learning:** TensorFlow, Vertex AI

## Setup and Deployment
### Prerequisites
1. Google Cloud Platform account with billing enabled.
2. Firebase project set up with Firestore and Authentication.
3. Docker installed locally for containerization.

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/petmed-ai-cloud.git
   cd petmed-ai-cloud

