const express = require('express');
const authrouter = express.Router();
const {register , login} = require("../controller/authControlller")

authrouter.post('/register',register)
authrouter.post('/login',login)

module.exports = authrouter