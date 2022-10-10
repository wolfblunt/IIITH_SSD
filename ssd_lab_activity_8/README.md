# MERN-expressJs

>## Overview
- This assignment has been designed to implement the basics of ExpressJs framework.
- This project has made use of MongoDB Cloud platform as a database server.
- It covers basic session based authentication.
- Two service classes have been implemented (CRUD operations):
    - Authentication
    - Students Service
    - TA Service


>## Execution
- Make sure your present location is inside the **_MERN-server_** folder.
- Create **.env** file consisting the MongoDB connection URI. You may follow the **`.env sample`** file provided as an example.
- The Libraries that are used here, (Make sure you install it using `npm` command) 
    - express 
    - mongoose 
    - dotenv 
    - cors 
    - body-parser 
    - bcrypt 
    - express-session 
    - connect-mongodb-session

- Next, Run the below command:
    ```
        nodemon app.js
    ```

# MERN - ReactJS [Frontend Client]

- We have created the frontend side of the application using ReactJS.
- This frontend client contains 3 main components:
    - LoginForm
    - SignUpForm
    - StudentQuery Page
    - Student Concern Page

- The structure of the code is based on the template provided by *create-react-app*.
- In this project, I have used functional components.
- Most of the key concepts that are used in any React application are covered in this project.

### Steps to run the Client App.

- Open a new terminal and navigate to the location MERN-client/mern-client.
- Run the following command to install the dependencies :
    ```
    npm install
    ```
    This will create the node_modules folder and install all the packages in it.
-  Run the following command to start the application:
    ```
    npm start
    ```

# MERN-expressJs API

http://localhost:3000/api/login

Input JSON: 
// For TA
{
    "roll": "2021",
    "password": "aman123",
    "role": "ta"
}

// For Student

{
    "roll": "2022201010",
    "password": "aman123",
    "role": "student"
}

Response : 
{
    "msg": "You have logged in successfully",
    "userSession": {
        "roll": "2021"
    }
}


// SignUP/ Register

http://localhost:3000/api/register

Input JSON : {"roll":"2022201017","password":"aman123","role":"student"}
Output JSON : {"msg":"user is successfully saved"}




// For Update the comments by TA:

http://localhost:3000/ta/updateQuery

{
    "roll": "2022201010",
    "course_name": "DSAPS",
    "exam_name": "MidSem 1",
    "question_num": 1,
    "ta_comment": "Done and Dusted",
    "ta_roll": "2021"
}


Response : 
{
    "data": {
        "_id": "634198553af11864bdd6c609",
        "exam_name": "MidSem 1",
        "course_name": "DSAPS",
        "question_num": 1,
        "ta_roll": "2021",
        "roll": "2022201010",
        "ta_comment": "Done and Dusted",
        "std_comment": "Doubt in Q1",
        "IsActive": false,
        "createdAt": "2022-10-08T15:33:41.627Z",
        "updatedAt": "2022-10-09T07:30:34.948Z",
        "__v": 0
    }
}


// Student ShowQuery API  - GET
- http://localhost:3000/std/showQuery/<rollNo>

Output JSON:
{
  "data": [
    {
      "_id": "633ea9366e660e6d9146484f",
      "exam_name": "MidSem 2",
      "course_name": "SSD",
      "question_num": 2,
      "ta_roll": "2022",
      "roll": "2022201010",
      "createdAt": "2022-10-06T10:08:54.375Z",
      "updatedAt": "2022-10-09T07:13:11.275Z",
      "__v": 0,
      "IsActive": false,
      "ta_comment": "Try out yourself"
    },
    {
      "_id": "633eaa3bb9c9591affc1c2ec",
      "exam_name": "MidSem 1",
      "course_name": "SSD",
      "question_num": 1,
      "ta_roll": "2021",
      "roll": "2022201010",
      "ta_comment": "Kernal is God Mode",
      "std_comment": "Doubt in Q4",
      "IsActive": false,
      "createdAt": "2022-10-06T10:13:15.267Z",
      "updatedAt": "2022-10-09T08:35:22.966Z",
      "__v": 0
    }
  ]
}


// TA ShowQuery API  - GET
http://localhost:3000/ta/showQuery/2021
{
    "data": [
        {
            "_id": "633eaa3bb9c9591affc1c2ec",
            "exam_name": "MidSem 1",
            "course_name": "SSD",
            "question_num": 1,
            "ta_roll": "2021",
            "roll": "2022201010",
            "ta_comment": "",
            "std_comment": "",
            "IsActive": true,
            "createdAt": "2022-10-06T10:13:15.267Z",
            "updatedAt": "2022-10-06T10:13:15.267Z",
            "__v": 0
        },
        {
            "_id": "634198553af11864bdd6c609",
            "exam_name": "MidSem 1",
            "course_name": "SSD",
            "question_num": 1,
            "ta_roll": "2021",
            "roll": "2022201010",
            "ta_comment": "",
            "std_comment": "Doubt in Q1",
            "IsActive": true,
            "createdAt": "2022-10-08T15:33:41.627Z",
            "updatedAt": "2022-10-08T15:33:41.627Z",
            "__v": 0
        }
    ]
}

// Student Add Query Form - POST Request
http://localhost:3000/std/addQuery

Input JSON: 
{
  "exam_name": "Mid Sem2",
  "course_name": "TOC",
  "question_num": "2",
  "ta_roll": "2021",
  "std_comment": "What is Finite Automata",
  "roll": "2022201010"
}

Output JSON :
{"data":{"exam_name":"Mid Sem2","course_name":"TOC","question_num":2,"ta_roll":"2021","roll":"2022201010","ta_comment":"","std_comment":"What is Finite Automata","IsActive":true,"_id":"6342a6391cb123905cb01846","createdAt":"2022-10-09T10:45:13.868Z","updatedAt":"2022-10-09T10:45:13.868Z","__v":0}}


//Logout - GET

http://localhost:3000/api/logout
Output JSON - {"msg":"Logout Successfull..."}

## Resources:
### ReactJS
-   [Tutorial from official site](https://reactjs.org/tutorial/tutorial.html)
-   [Tutorial video covering the basics](https://www.youtube.com/watch?v=Ke90Tje7VS0) 
-   [Functional Components](https://www.knowledgehut.com/blog/web-development/react-functional-components)
### Babel [just for concept]
-   [https://babeljs.io/repl](https://babeljs.io/repl)
        
This is handled internally by the package
### MERN Stack
-   [Step By Step Tutorial](https://codingthesmartway.com/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-1/)