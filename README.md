# P3tsKit - Cloud Computing Documentation

P3tsKit is an innovative application designed to assist pet owners in diagnosing external diseases in dogs and cats using machine learning. The cloud computing module is a critical component that handles data storage, model deployment, and backend services to ensure seamless user experience and scalability.

---

## Table of Contents
- [Overview](#overview)
- [Contributor](#contributor)
- [List of API Endpoints](#list-of-api-endpoints)
- [Environment](#environment)
- [Cloud Architecture](#cloud-architecture)
---

## Overview

P3tsKit’s cloud computing module manages:
1. Deployment of machine learning models for disease detection.
2. Secure storage of user and pet data.
3. Scalable backend infrastructure for handling app traffic.
4. Integration with third-party services like Firebase for authentication.

Pet owners often face challenges in identifying external health issues in their pets, leading to delayed treatment. Our app addresses this by using machine learning to analyze smartphone or uploaded images, quickly detecting external diseases in dogs and cats. This tool empowers pet owners to respond to their pets' health needs promptly and effectively.

---

## Contributor

This product has been developed by group **C242-PS104** for the Bangkit Capstone Project.

| Name                           | Role                  | ID             |
|--------------------------------|-----------------------|----------------|
| Bunga Harumalia Mardikawati    | Machine Learning      | M283B4KX0883   |
| Hanivianka Amelia Hamson       | Machine Learning      | M283B4KX1717   |
| Linda Magdalena                | Machine Learning      | M283B4KX2275   |
| Nathan Tanoko                  | Cloud Computing       | C102B4KY3266   |
| Timothy Henseputra             | Cloud Computing       | C102B4KY4346   |
| Syifa Maulida                  | Mobile Development    | A283B4KX4276   |
| Finka Nindy Azahra             | Mobile Development    | A283B4KX1514   |

---

## List of API Endpoints

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
- **Response**:
  - **Success (201 - Created)**:
    ```json
    {
    "error": false,
    "id": "string",
    "name": "string",
    "email": "string",
    "password": "string"
    }
    ```
  - **Error (409 - Conflict)**:
    ```json
    {
      "error": true,
      "message": "The email already exists."
    }
    ```
  - **Error (500 - Internal Server Error)**:
    ```json
    {
      "error": true,
      "message": "Error message."
    }
    ```
  
### b) User Login
- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string (valid email format)"
  }
- **Response**:
  - **Success (200 - OK)**:
    ```json
    {
    "error": false,
    "token": "string"
    }
    ```
  - **Error (400 - Bad Request)**:
    ```json
    {
      "error": true,
      "message": "All input is required."
    }
    ```
  - **Error (401 - Unauthorized)**:
    ```json
    {
      "error": true,
      "message": "Email not Exist!"
    }
    ```
  - **Error (401 - Unauthorized)**:
    ```json
    {
      "error": true,
      "message": "Wrong Password!"
    }
    ```
  - **Error (500 - Internal Server Error)**:
    ```json
    {
      "error": true,
      "message": "Error message."
    }
    ```

### c) Change Password User
- **URL**: `/change-password`
- **Method**: `PUT`
- **Headers**:
  - `Authorization`: `Bearer <JWT_Token>`
- **Request Body**:
  ```json
  {
    "new_password": "string"
  }
- **Response**:
  - **Success (200 - OK)**:
    ```json
    {
    "error": false,
    "message": "password successfully updated."
    }
    ```
  - **Error (400 - Bad Request)**:
    ```json
    {
      "error": true,
      "message": "All inputs are required."
    }
    ```
  - **Error (400 - Bad Request)**:
    ```json
    {
      "error": true,
      "message": "User not found!"
    }
    ```
  - **Error (500 - Internal Server Error)**:
    ```json
    {
      "error": true,
      "message": "Error message."
    }
    ```
  
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
    "disease_info (based on ML prediction)": {
        "causes": "string",
        "description": "string",
        "note": "string",
        "source": "string",
        "symptoms": "string",
        "treatment": "string"
      },
    "predicted_class": "string",
    "image_url": "string (url image on Cloud Storage)",
    "user_id": "string",
    "createdAt": "timestamp"
    }
  - **Error (500 - Internal Server Error)**:
    ```json
    {
      "error": true,
      "message": "Failed to fetch diagnose."
    }
    ```
### e) Get History
- **URL**: `/history`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <JWT_Token>`
- **Response**:
  - **Success (200 - OK)**:
    ```json
    {
    "history (based on recent diagnose)": {
        "causes": "string",
        "description": "string",
        "note": "string",
        "source": "string",
        "symptoms": "string",
        "treatment": "string"
      },
    "predicted_class": "string",
    "image_url": "string (url image on Cloud Storage)",
    "user_id": "string",
    "createdAt": "timestamp"
    }
    ```
  - **Error (500 - Internal Server Error)**:
    ```json
    {
      "error": true,
      "message": "Failed to fetch history."
    }
    ```
  - **Error (404 - Not Found)**:
    ```json
    {
      "error": true,
      "message": "No history found."
    }
    ```

---

## Environment

**P3tsKit Backend** runs with:

1. Express.js
2. GCP App Engine
3. Cloud Storage
4. Cloud Run (for scalable APIs)
5. Firestore (for database)

---

## Cloud Architecture

The architecture leverages:
- **Compute :** Google Cloud Platform (GCP) services, including Cloud Run for deploying containerized applications.
- **Storage :** Google Cloud Storage for storing user-uploaded images.
- **Databases :** Firestore for real-time database management.

---

![WhatsApp Image 2024-12-13 at 15 46 00_025dbaaa](https://github.com/user-attachments/assets/1243b2ac-1ecf-47a1-853e-d4c55d564d49)



