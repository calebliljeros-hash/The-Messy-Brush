import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models'

const router = Router()

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['username', 'email', 'password']
            })
        }

        // Create user (password will be hashed by beforeCreate hook)
        const user = await User.create({
            username,
            email,
            password,
        })

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user.toJSON()

        res.status(201).json({
            message: 'User registered successfully',
            user: userWithoutPassword
        })

    } catch (error: any) {
        console.error('Registration error:', error.message)

        // Handle validation errors
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation failed',
                details: error.errors.map((err: any) => ({
                    field: err.path,
                    message: err.message,
                }))
            })
        }

        // Handle duplicate email
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                error: 'Email already exists'
            })
        }

        res.status(500).json({ error: 'Failed to register user' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            })
        }

        // Find user by email
        const user = await User.findOne({ where: { email } })

        if (!user) {
            // Don't reveal whether email exists or not (security best practice)
            return res.status(401).json({
                error: 'Invalid email or password'
            })
        }

        // Verify password using the comparePassword instance method
        const isPasswordValid = await user.comparePassword(password)

        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Invalid email or password'
            })
        }

        // Generate JWT token
        const secret = process.env.JWT_SECRET
        const expiresIn = process.env.JWT_EXPIRES_IN || '24h'

        if (!secret) {
            console.error('JWT_SECRET is not defined in environment variables')
            return res.status(500).json({ error: 'Server configuration error' })
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            secret,
            { expiresIn }
        )

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user.toJSON()

        res.json({
            message: 'Login successful',
            token, // Client should store this token
            user: userWithoutPassword
        })

    } catch (error: any) {
        console.error('Login error:', error.message)
        res.status(500).json({ error: 'Login failed' })
    }
})

export default router
