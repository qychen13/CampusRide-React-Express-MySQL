# CampusRide-React-Express-MySQL
The project is an full stack implementation including database design for the campus ride appointment system of golf cart and campus auto at UNC Charlotte. 

The main structure of the repository is as below:

    .
    ├── Frontend                   # Frontend directory: React 4 + BootStrap 4 
    │   ├── public                 # Static file directory: contains css, bootstrap, javascript for the views
    │        ├── ...
    │   ├── src                    # React file directory
    │        ├── api               # Http api communicate to backend API
    │             ├── public.js    # Public api without user authentification
    │             ├── student.js   # Private api require user authentification
    │        ├── Auth                   # Auth0 user authentification 
    │            ├── auth0-variables.js # The configuration of Auth0: ** you should setup your own auth0 server here **
    │            ├── Auth.js            # Authentification api via Auth0
    │        ├── components
    │            ├── appointments  # Appointment page
    │            ├── main          # Main page
    │            ├── student       # Profile page
    │            ├── timetable     # Auto & cart timetable page
    │            ├── Callback.js   # Callback page: store the authentification token
    │            ├── NaviBar.js    # Navigation component
    │            ├── SideBar.js    # SideBar component
    │            ├── ...
    │        ├── index.js          # The root react component: react application entry point
    │        ├──
    │   ├── package.json           # Required node js modules
    ├── Backend                    # Backend API directory: Node.js + Express 
    │   ├── public                 # Public files: no need for this app, just express generator legacy
    │        ├── ...
    │   ├── routes                 # Main API directory which communicates to the frontend api
    │       ├── public.js          # Public API: receive queries from frontend API and send response data back     
    │       ├── Student.js         # Authentification required API: receive and process requests from frontend API 
    │       ├── utilities.js       # SQL helper functions
    │   ├── utils                  # Database API & Authentification directory
    │       ├── auth0-variables.js       # Auth0 configuration: ** you should setup your own auth0 server here **
    │       ├── database-variables.js    # MySQL configuration: ** you should setup your own mysql server here **
    │       ├── database-mysql.js        # Synchronized mysql api
    │       ├── database-mysql2.js       # Asynchronized mysql2 api
    │       ├── jwtcheck.js              # JWT authentification middleware
    │       ├── user.js                  # Auth0 & MySQL related api
    │   ├── view                   # Jade template directory: little need for this app, just express generator legacy and debug use
    │   ├── package.json           # Required node js modules
    ├── mysql-database             # MySQL database directory
    │   ├── Dump-CampusRide.sql    # Mysql dump file  
    │   ├── test-data-generator
    │       ├── schedule.py        # Python helper function for generate test data for auto and cart schedule
    └── README.md

## Setup and Run

* Node.js enviroment setup
  
  Follow the link https://nodejs.org/en/ for the installation.
  
* MySQL database setup and run

  Using the Dump-CampusRide.sql file to import database in your MySQL server. 
  For the bussiness rule concern, the web UI only supports the query and update for the appointments after current date. And the database dump file only generate the schedule data up to May 2018. In order to support the full functionalities of the application after that time, you should generate more test data for the appropriate dates. Reference to the schedule.py file under test-data-generator directory for the use to generate mysql syntaxes to insert data.
  Start your MySQL server:
  ```bash
  mysqld_safe -u 'mysql'
  ```
  Edit ./backend/utils/database-variables.js file with your MySQL server configuration.
  
* Auth0 service setup
  
  The authentification of the app use Auth0 based JWT authentification method. There is a free tier for use Auth0, check out the website (https://auth0.com/) for more details. After setting up an api/client of on Auth0 account, edit ./backend/utils/auth0-variables.js and ./frontend/src/Auth/auth0-variables.js with your Auth0 configuration. For the backend compatibility of user profile process, it is recommended using the connection for Google account.
  
* Backend setup and run
  From the project root directory, 
  
  ```bash
  cd backend
  npm install  # install node pakages for backend
  node ./bin/www # run backend server on default port 3000
  
  ```
  
  The backend api will talk to MySQL server and listen on port 3000 for data fetching requests.

* Frontend setup and run
  From the project root directory,
  ```bash
  cd frontend
  npm install # install node pakages
  PORT=3001 npm start # start frontend server on port 3001
  ```
  Open your browser, enter and open url https://yourserverurl:3001 (http://localhost:3001 if you run on your local machine) to see the main page of the application.
  
## Development Starting Point and Framework

* Frontend (React 4 + Bootstrap 4)

  For the simplicity setup about React, I use [Create React App](https://github.com/facebook/create-react-app) framework as the starting point of the project.
  
  For the bootstrap and html components, I use the theme/template [Light Bootstrap Dashboard](https://www.creative-tim.com/product/light-bootstrap-dashboard) for the basic structure design.
  
* Backend (Node.js + Express)

  I use [express application generator](https://expressjs.com/en/starter/generator.html) framework as the starting point of the backend api. Since the backend server serves like a data API, there is no need for some view template setup in the initial generating framework.
  
  
## Business Rules and Assumptions

The system support three kind of user to login, *student*, *driver* and *manager* (admin user). The student can make/change appointment for two kinds of rides, auto ride and golf cart ride. The auto ride has fixed timetable and stops which is free while the golf cart ride can have customized pick-up time and do not have spercific drop off location with more flexibility thus it is chargeable. The driver would be assigned to specific vehicle (including auto and cart) on specific date by manager.

### Full Use Case

Student can register and login to the system to make the appointment for golf cart or auto ride. After the ride, they can give the feedback and rate the driver or the ride. Manager (admin user) can login to make schedule for the auto line or golf cart to drivers on specific date. Driver can login to the system to check the schedule and finish the cart ride trip by filling the billing information. 

<p align='center'>
<img src='./imgs/use-case.jpg' width='600' alt='use case'/>
</p>


### Implemented Parts

For the database, it implements the whole part of the full use case including 12 tables with generalizaiton/specialization relationship. In this web application, due to the time limitation, I only implemented some key functionalities of the student user part, which includes **looking up auto/cart schedule timetable, registration, log in, log out, make/look up/cancel appointments, look up/update profile**. 

### More About Auto Ride

The auto ride has scheduled lines and timetable. Each auto with associated timetable would be assigned to a driver on spercific working day by the manager. After manager's schedule, student can look up and see the scheduled auto ride timetable by choosing the pick up stop, drop off stop and date. Right now, for the test data (which is included in SQL dump file), I use the existing [UNCC Next Ride](http://nextride.uncc.edu/). The stop information is refrenced from https://pats.uncc.edu/transportation/transportation-tracking. The routes in the next ride, gold, silver and green line are corresponding to line 0, 1, 2 in SQL route table. 

### More About Cart Ride

Cart ride and have customizable pick up time and do not need assign the spercific drop off location. Thus, it is more flexible and maybe chargeable. For the pick up communication concern, it should have spercific pick up location at the time making appointment. 

## Web UI 

### Public/Guest Time Table Look Up

### User Authentification

### Manage Appointment (create, look up and cancel)

## EERD

## Data Dictionary(Meta Data)

## SQL Implementation Details

### Stored Procedure 

### Trigger

### CRUD API

### View

### Indexes

## ToDo (Future Work)

## References

  



