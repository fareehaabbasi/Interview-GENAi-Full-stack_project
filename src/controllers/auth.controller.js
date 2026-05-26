const authModel = require("../models/user.model.js")
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

/**
 * @name userRegister
 * @desc Controller to handle user registration, expect username, email and password in the request body
 * @access Public
 */
async function userRegister(req, res) {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).
        json({message: "All fields are required"})
    }

    const isAlreadyRegistered = await authModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if (isAlreadyRegistered) {
        return res.status(400).json({
            message: "Username or Email already registered"
        })
    }

    const hashesPassword = await bcrypt.hash(password, 10)

    const user = await authModel.create({
        username, 
        email,
        password: hashesPassword
    })

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name userLogin
 * @desc Controller to handle user login,expect email and password in the request body
 * @access Public
 */
async function userLogin(req, res) {
    const {email, password} = req.body;

    const user = await authModel.findOne({ email })

    if(!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

        const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie('token', token)

    res.status(200).json({
        message: "User logged in successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })

}

module.exports = {
    userRegister,
    userLogin
}