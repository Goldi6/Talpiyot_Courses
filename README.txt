# Courses

MERN website for courses and students management made as a project while learning React and NodeJS.

## Setup environment variables

### client
In the client folder create **.env.development** file then add *REACT_APP_PATH* variable with your server domain or localhost path e.g *http://localhost:5000*.

### server

In the Server folder create **./config/dev.env** then add the corresponding variables:
 
ATLAS_URI = with your mongoDB connection uri.

TOKEN_SECRET = which is used for jws tokens authentication

PORT = which will be the same as in the client PATH variable if you use localhost. 

## Installation



cd to the server folder and install all packages

```terminal
npm i
```
cd to the client folder and install all packages


```terminal
yarn install
```

## Usage

Run node server and the client react app
```python
cd server
npm run dev

cd client 
yarn run start
```
