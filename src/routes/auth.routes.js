const { Router } = require('express');
const authController = require("../controllers/auth.controller")

const authRoutes = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRoutes.post('/register', authController.userRegister)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRoutes.post('/login', authController.userLogin)

module.exports = authRoutes;