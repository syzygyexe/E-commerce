## E-commerce

E-commerce web-site powered by the MERN stack.

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

Set .env files' NODE_ENV to developement mode.

```
./.env
NODE_ENV = development
```

## Set-up your MongoDB and PayPal Sandbox API
Fill-in your Mongo URI inside of the .env file.
<br>
Fill-in your PayPal Sandbox Client ID.
```
./.env
MONGO_URI = ??????
PAYPAL_CLIENT_ID = ??????
```

## Learn more about PayPal Sandbox API

https://developer.paypal.com/developer/

## Developer Mode Testing
To launch an application in developer mode. The command below must be entered in the main root.
```bash
npm run dev
```
The application will run on the http://localhost:3000/ in development mode.

## Client build set-up.

Set .env files' NODE_ENV to production mode.
```
./.env
NODE_ENV = production
```

In order to create optimized client build enter the command below in the main root.

```
cd frontend
npm build
```

## Client build launch
In order to launch client build enter the command below in the main root.
```
npm start
```

The application will run on the http://localhost:5000/ in production build.

## NPM Vulnerabilities
In the case of the occurrence of unexpected npm vulnerabilities, the command below needs to be entered.

```npm audit fix```
