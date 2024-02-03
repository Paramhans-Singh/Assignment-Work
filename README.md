# OpeninApp Task Management API - Assignment

This repository contains APIs for task and subtask management. The project is built using MongoDB as the database and has backend functionalities. The APIs are designed to perform various operations related to tasks and subtasks, including creation, retrieval, updating, and deletion.

## Installation

1. Clone the repository:
  - git clone https://github.com/Paramhans-Singh/Assignment-Work.git
  - cd Assignment-Work
  

2. Install dependencies:
   npm install

3. Create a `.env` file in the root directory with the following credentials:
   PORT=3000,
   TWILIO_TOKEN = ""
   TWILIO_ACCOUNT_SID = ""
   PhoneNo=""

4. Start the server:
    npm start
 
## API Endpoints

### 1. Create Task
- **Endpoint**: `POST /api/tasks/create`
- **Input Parameters**: `title`, `description`, `due_date`
- **Authentication**: JWT token

### 2. Create Subtask
- **Endpoint**: `POST /api/subtasks/create`
- **Input Parameters**: `task_id`
- **Authentication**: JWT token

### 3. Get User Tasks
- **Endpoint**: `GET /api/tasks/`
- **Query Parameters**: `priority`, `due_date`, `page`, `limit`
- **Authentication**: JWT token

### 4. Get User Subtasks
- **Endpoint**: `GET /api/subtasks/`
- **Query Parameters**: `task_id`
- **Authentication**: JWT token

### 5. Update Task
- **Endpoint**: `PUT /api/tasks/update/:task_id`
- **Input Parameters**: `due_date`, `status` ("TODO" or "DONE")
- **Authentication**: JWT token

### 6. Update Subtask
- **Endpoint**: `PUT /api/subtasks/update/:subtask_id`
- **Input Parameters**: `status` (0 or 1)
- **Authentication**: JWT token

### 7. Delete Task (Soft Deletion)
- **Endpoint**: `DELETE /api/tasks/:task_id`
- **Authentication**: JWT token

### 8. Delete Subtask (Soft Deletion)
- **Endpoint**: `DELETE /api/subtasks/:subtask_id`
- **Authentication**: JWT token

## Note
- Soft deletion is implemented for both tasks and subtasks, meaning the records are not permanently removed from the database.
