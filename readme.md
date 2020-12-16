## E-commerce

E-commerce web-site powered by the MERN stack.

## Developer Mode Installation
For the full functionality of the website, Node.js must be installed on the computer.
The applications' back-end/front-end can be installed with the npm install command in the main root and inside of the frontend folder.
```bash
npm install
cd frontend
npm install
cd ..
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

## Developer Mode Testing
To launch an application in developer mode. The command below must be entered in the main root.
```bash
npm run dev
```
The application will run on the http://localhost:3000/


## NPM Vulnerabilities
In the case of the occurrence of unexpected npm vulnerabilities, the command below needs to be entered.

```npm audit fix```
