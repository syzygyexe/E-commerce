## E-commerce

E-commerce web-site powered by the MERN stack.

## Try it yourself!

Deployed version of the website can be tested in the link below.
<br>
https://alexander-borisov-mern-ecom.herokuapp.com/

## Learn More

More info about the project can be found in the link below.
<br>
https://alexander-borisov-portfolio.herokuapp.com/#projects

## Developer Mode Installation

For the full functionality of the website, Node.js must be installed on the computer.
The applications' back-end/front-end can be installed with the npm install command in the main root and inside of the frontend folder.

```bash
npm install
cd frontend
npm install
cd ..
```

Set-up your .env file.

```
./.env
NODE_ENV = development
PORT = 5000
MONGO_URI = ***YOUR_MONGO_URI***
JWT_SECRET = ***YOUR_JWT_SECRET***
PAYPAL_CLIENT_ID = ***YOUR_PAYPAL_SANDBOX_CLIENT_ID***
```
## Upload Initial Database

In order to upload initial database with test users and test products run the command below in the main root.

```
npm run data:import
```

## Developer Mode Testing

To launch an application in developer mode. The command below must be entered in the main root.

```bash
npm run dev
```

The application will run on the http://localhost:3000/ in development mode.


## Client Build Set-Up.

Set .env files' NODE_ENV to production mode.

```
./.env
NODE_ENV = production
```

In order to create optimized client build enter the commands below in the main root.

```
cd frontend
npm build
```

## Client Build Launch

In order to launch client build enter the command below in the main root.

```
npm start
```

The application will run on the http://localhost:5000/ in production build.

## NPM Vulnerabilities

In the case of the occurrence of unexpected npm vulnerabilities, the command below needs to be entered.

`npm audit fix`
