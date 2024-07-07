# react-ts-crawling-app

To have the app running, a brief configuration must be done and some scripts must be run from both 'back' and 'front' directories.

## Environment variables
A '.env' file must be created inside the 'backend' and 'frontend' folders. The first one must contain values for the front-end url ('FRONT'), the port the server is going to use ('PORT'), your MongoDB user (MONGODB_USER) and password (MONGODB_PWD) for this app DB, and your JWT secret key (JWT_SECRET) as well. Your back-end '.env' file should look like this:

`FRONT=http://localhost:3000`

`PORT=5000`

`MONGODB_USER=yourMongoDBUser`

`MONGODB_PWD=yourMongoDBPwd`

`JWT_SECRET=yourJWTSecretKey`

The one inside the front-end folder must contain a value for the server url (REACT_APP_API_URL). Therefore, your front-end '.env' file should look like this:

`REACT_APP_API_URL=http://localhost:5000`

## Available Scripts

### Run locally

In both 'backend' and 'frontend' directories, you must run:

### `npm install`

Installs all the necessary dependencies for the app to run correctly.

### `npm start`

Runs the app locally.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Deployment

```bash
  npm run build
```

Compiles and prepares your project for production deployment, optimizing code and resources.


## API Reference

#### Create a new user

```http
  POST /api/users/register
```

#### Log in

```http
  POST /api/users/login
```

#### Create a new crawling job

```http
  POST /api/jobs
```

#### Start the crawling process for a specific job

```http
  POST /api/jobs/:jobId/start
```

#### Get the crawling jobs created by your user

```http
  GET /api/jobs
```

#### Get the status of a specific crawling job

```http
  GET /api/jobs/:jobId
```

