const express = require('express')
const app = express();
const port = 5000
const { main } = require("./Config")
const productRoutes = require("./Router/productRoutes");
const userRoutes = require('./Router/userRoutes')
const User = require("./model/User");
var jwt = require("jsonwebtoken");

const authMiddleware = require("./MiddleWare/auth").auth; // Import the auth middleware
const  createUser  = require('./Router/Auth');
const  login  = require('./Router/Auth');
require("dotenv").config();
app.use(express.json());



app.get('/',(req, resp) => {
    console.log('working server')
    resp.send("hello")
    resp.send()
})

// Route handler that requires authentication
app.get("/protected-route", authMiddleware, (req, res) => {
  res.send("This route is protected");
});


app.use("/products", authMiddleware, productRoutes);

app.use("/",userRoutes);
app.use("/", createUser)
app.use("/",login)



async function startServer() {
  try {
    await main();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
express.Router()

