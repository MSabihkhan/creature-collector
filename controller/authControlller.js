const bcrypt = require('bcrypt')
const saltrounds = 10
const User = require("../models/user")
const jwt = require('jsonwebtoken')

const register = async(req , res)=>{
    try{
    const user = req.body.username
    const Password = await bcrypt.hash(req.body.password, saltrounds)
    newUser = await User.create({
        username : user,
        password : Password
    })
    res.status(201).json({'message':'User Created successfully'})
}
catch(err){
    res.status(400).json({ error: 'Username already exists' })
}
}

const login = async (req, res)=>{
    try{
    const user = req.body.username
    const password = req.body.password
    const USER = await User.findOne({username : user})
    if (!USER){
        return res.status(404).json({'message':'user not found'})
    }
    const isMatch = await bcrypt.compare(password,USER.password)
    if (isMatch) {
            console.log("✅ Login successful!");
            const token = jwt.sign({userId : USER._id},'secret',{expiresIn:'1h'})
            res.cookie('token', token, { httpOnly: true })
            return res.status(200).json({'message':'Login successful!'})
        } 
    else {
            console.log("❌ Invalid credentials");
            return res.status(401).json({ error: 'Invalid credentials' })
    }
}
catch(err){
    console.error("Comparison Error:", err.message);
    res.status(401).json({"Passowrd": "Incorrect"})
}
}

exports.register = register

exports.login = login