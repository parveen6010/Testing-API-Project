
 ![api](https://github.com/parveen6010/Testing-API-Project/assets/77872164/4c1b2ed7-1c65-488f-8611-b2ac49876826)

 # Testing-API-Project
Setup Instructions
Prerequisites
Node.js installed on your machine
MongoDB Atlas account 

Installation
Clone the repository to your local machine:

Navigate to the project directory:
Install dependencies using npm:
npm install

Running the API
Start the server:
npm start

The API will be running locally at http://localhost:5000.
API Endpoints
POST /sleep
Allows users to submit their sleep duration along with a timestamp.
Request Body (JSON):
[{
  "userId": "user1",
  "hours": 8,
  "timestamp": "2023-05-18T07:00:00Z"
},

]
Response (JSON):
{
  "_id": "605c72ef1f1f1f1f1f1f1f1f",
  "userId": "user1",
  "hours": 8,
  "timestamp": "2023-05-18T07:00:00.000Z",
  "__v": 0
}

GET /sleep/:userId
Retrieves a list of all sleep records for a given user, sorted by date.
Response (JSON):
  {
    "_id": "605c72ef1f1f1f1f1f1f1f1f",
    "userId": "user1",
    "hours": 8,
    "timestamp": "2023-05-18T07:00:00.000Z",
    "__v": 0
  }

DELETE /sleep/:recordId
Deletes a specific sleep record by its ID.

Testing
To run the tests for the API, use the following command:
npm test


