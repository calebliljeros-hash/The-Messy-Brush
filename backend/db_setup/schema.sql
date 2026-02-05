-- Database setup for Sequelize Associations
-- Run this file to create the database

-- Create database
CREATE DATABASE artwork;

-- Connect to the database
\c artwork;

-- Tables will be created automatically by Sequelize
-- when you run the seed command or start the server.

-- The following is what Sequelize will create:

-- CREATE TABLE authors (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
--   "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE books (
--   id SERIAL PRIMARY KEY,
--   title VARCHAR(255) NOT NULL,
--   isbn VARCHAR(20) UNIQUE NOT NULL,
--   "publishedYear" INTEGER,
--   "authorId" INTEGER REFERENCES authors(id) ON DELETE CASCADE,
--   "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
--   "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
-- );
