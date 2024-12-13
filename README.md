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


    # P3tsKit - Cloud Computing Module

P3tsKit is an innovative application designed to assist pet owners in diagnosing external diseases in dogs and cats using machine learning. The cloud computing module is a critical component that handles data storage, model deployment, and backend services to ensure seamless user experience and scalability.

---

## Table of Contents
- [Overview](#overview)
- [Contributor](#contributor)
- [Environment](#environment)
- [Cloud Architecture](#cloud-architecture)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Setup and Deployment](#setup-and-deployment)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

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
- **Compute:** Google Cloud Platform (GCP) services, including Cloud Run for deploying containerized applications.
- **Storage:** Google Cloud Storage for storing user-uploaded images.
- **Databases:** Firestore for real-time database management.

---

## Key Features

1. **Model Deployment:** A pre-trained machine learning model for diagnosing pet diseases.
2. **Scalability:** Auto-scaling backend using GCP Cloud Run.
3. **Secure Data Management:** Encrypted storage of images and sensitive user data.
4. **Real-time Notifications:** Integration with Firebase Cloud Messaging (FCM) for updates.

---

## Technology Stack

- **Backend:** Node.js, Express.js
- **Cloud Platform:** Google Cloud Platform (GCP)
- **Database:** Firestore (NoSQL)
- **Image Storage:** Google Cloud Storage
- **Machine Learning:** TensorFlow

---

## Setup and Deployment

### Prerequisites
1. Google Cloud Platform account with billing enabled.
2. Firebase project set up with Firestore.
3. Docker installed locally for containerization.

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/p3tskit-cloud.git
   cd p3tskit-cloud


### Perubahan Utama:
1. **Penggabungan Komponen**:
   - Bagian *overview*, *contributors*, dan *cloud architecture* telah digabungkan dari kedua bagian.
2. **Setup and Deployment**:
   - Menambahkan langkah-langkah setup dari kedua sumber menjadi lebih detail.
3. **API Endpoints**:
   - Tetap dalam format tabel, dengan deskripsi singkat setiap endpoint.

Jika ada tambahan lain, beri tahu saya! 😊
