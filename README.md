# Customers Dashboard
This is a dashboard built for viewing customers, built with
- React.js 
- TypeScript
- Redux Toolkit Query
- Redux persist
- styled-components
- Material UI

The backend for this project is a Mock JSON API that is built using the `json-server` library,  which builds a mock CRUD API by watching a `json`  file.

## Running the project
To run the project you'll need to do the following
- run `yarn` in both the root directory and the `/backend` directory. 
- Login using the credentials provided below

#### Admin: Allows viewing and editing customers data
```
email: admin@email.com
password: admin
```

#### Viewer: Only allows viewing customers data
```
email: viewer@email.com
password: viewer
```