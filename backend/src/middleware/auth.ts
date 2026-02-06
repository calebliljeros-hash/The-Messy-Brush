import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number
        email: string
      }
    }
  }
}

interface JwtPayload {
  userId: number
  email: string
  iat?: number
  exp?: number
}

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
  const authHeader = req.headers.authorization

  const token = authHeader?.split(' ')[1]

  if (!token) {
    res.status(401).json({
      error: 'Token not found',
      message: 'Authorization header must be in format: Bearer <token>',
    })
    return
  }

  try {
    const secret = process.env.JWT_SECRET

    if (!secret) {
      console.error('JWT_SECRET is not defined in environment variables')
      res.status(500).json({ error: 'Server configuration error' })
      return
    }

    const decoded  = jwt.verify(token, secret) as JwtPayload

    req.user = {
      userId: decoded.userId,
      email: decoded.email
    }

    next()
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        error: 'Token expired',
        message: 'Your session has expired.',
      })
      return
    }

    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        error: 'Invalid token',
        message: 'The provided token is invalid.',
      })
      return
    }

    res.status(401).json({
      error: 'Authentication failed',
      message: error.message,
    })
  }
}