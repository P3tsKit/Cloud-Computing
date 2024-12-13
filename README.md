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
