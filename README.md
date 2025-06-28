
# SCATCH
Hey! , This is a Web Based Ecommerce Application 🛒 
click [here](https://scatch-pce3.onrender.com/) to Check out this live🤞

## Tech Stack

**TechStack used:** Tailwind CSS, Node JS with Express, MongoDB Atlas for deployment, EJS Scripting for page development



## Project Notes



***A Premium Bag Shop*** **Scatch**

initialize npm on a new project.

Use your Command Line and navigate to the root folder of your project and enter

```
npm init -y
```
change main to app.js

```
npm i express mongoose 

npm i jsonwebtoken cookie-parser bcrypt multer
```


```
ctrl+shift+p => add git keep
```

- Separation of concern model

- kebab-case
- camelCase we follow at industrial level & coding lvl good practice 

- did API Testing for the routes

- learning how to setup debbuger, (we can't see anything printed in debugger until we setup environment variables)

```
export DEBUG=development:*
```

- using config is a much better modular way than using ENV Variables coz, u can create diff settings for Prod, dev & test

***************************************************************************
4:54 PM 6/16/2025

- if there is no process.env it won't show anything. 
- try console log process.env.NODE_ENV if it shows undefined it isn't setup what's the environment

now in cmd, setup node env-> 
```export NODE_ENV=Development```

- these env vars go & get stored in memory(can't even find anywhere and also in env file

****11:14 AM 6/21/2025************************************
```setup ejs (npm install ejs)```

**********9:37 AM 6/22/2025************************

- Implemented landing page for Create Account and login

- Mongodb is is schemaless if we don't provide any field for ex: pwd,email while creating acct, it will create 
- we can handle it using joy based (so you can learn this joy & use it)

- edited userRoute and tested using postman

- use bcrypt to hash password

- jsonwebtoken to store cookies(like setting up token while 

- setup cookies

- writing modular code for token(used keys.js file in config folder & utils folder with generateToken.js file) 

- in controllers folder we create a file authController.js and add our code there

=> solved the errors (flash not shwing up

*******************9:13 PM 6/23/2025*******

- in the owners/admin route to upload files(like product images we are using multer

- creating products using owners/product/create route
- using multer-config, we keep image as buffer type

- make sure what you name in your model database(product model) & what you name in name field in form fields at the frontend should be same

******11:33 AM 6/24/2025*******************

/owners/admin route for creating product

adding products to the admin page(creating them)
with proper color coding

*************************8:05 AM 6/25/2025*****

Logout fuctionality

Adding to Cart route 

displaying cart items based on user email 

showing the actual bill




## Render
you can use render(Free tier ofcourse for personal projects😊 to deploy your backend code live. if you are interested then please check [Render](https://render.com/) for deployment.

