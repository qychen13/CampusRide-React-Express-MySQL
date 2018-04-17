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
## 
