# FullStack Projects
This repo contains the fullstack projects developed as part of the FullStackOpen course.

## Live Deployment from Part 5
  - Live deployment: [Blog App](https://blog-app-ipr7.onrender.com/)
  - Test login details: 
  - Username: guest 
  - Password: 123
  
  - Note: May take a few seconds for first-time instance to load 

## Projects in `part2` folder

### 1. Country Display App
A React-based app that allows users to display country details, including name, capital, and population. The data is fetched from a public API.
- **Technologies Used**: React, CSS, Axios
- **Features**:
  - Search for countries by name.
  - Display detailed information about each country (name, capital, population).
  - Utilize Axios for API calls to fetch country data.

### 2. Phonebook App
A contacts management app built with React that provides functionality to add, edit, delete, and filter contacts. This app uses **JSON Server** to simulate RESTful API endpoints.
- **Technologies Used**: React, JSON Server, Axios
- **Features**:
  - Add new contacts with names and phone numbers.
  - Update or delete existing contacts.
  - Filter contacts by name.
  - Uses modern React hooks (`useState`, `useEffect`) for state management and lifecycle events.
  - CRUD functionality connected to a simulated backend using JSON Server.

## Projects in `part3` folder

### Phonebook Backend
An Express-based backend for the Phonebook app that serves and manages contacts. The backend also hosts the production build of the React frontend, making the app accessible as a full-stack application.
- **Technologies Used**: Node.js, Express, Axios, React (frontend)
- **Features**:
  - RESTful API built with Express for managing contacts.
  - Serves the production version of the React frontend.
  - Hosted on Render for live deployment: [Live App](https://full-stack-5jvd.onrender.com)
  - Implements CRUD operations for managing contacts.
  - Middleware for error handling and logging.

## Projects in `part4` folder

### Blog List Application
A Node.js backend application for managing blog posts with user authentication and testing.
- **Technologies Used**: Node.js, node:test, Express, MongoDB, Mongoose, Supertest, JWT
- **Features**:
  - RESTful API for managing blog posts and users
  - User authentication using JSON Web Tokens
  - Password hashing with bcrypt
  - MongoDB integration using Mongoose
  - Comprehensive testing suite using node:test and Supertest
  - Middleware for error handling, authentication, and logging
  - Token-based user authorization for blog operations
  - Integration tests for API endpoints and user operations

## Projects in `part5` folder

### Blog List Application
A full-stack blog management application with user authentication, testing, and a modern UI built with React and Tailwind CSS.
- **Technologies Used**: React, Node.js, MongoDB, Express, JWT, Tailwind CSS
- **Features**:
  - User authentication with JSON Web Tokens
  - Create, read, update, and delete blog posts
  - Like system for blog posts
  - Modern responsive UI with Tailwind CSS
  - Protected routes and API endpoints
  - Token-based authorization
  - Form validation and error handling
  - Live deployment: [Blog App](https://blog-app-ipr7.onrender.com/)
