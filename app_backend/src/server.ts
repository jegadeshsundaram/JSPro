import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import logger from './config/logger.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Deployment configuration
// configure env file in dev mode
dotenv.config()

// configure env file in production
if (process.env.NODE_ENV === undefined) {
  dotenv.config({ path: '../.env' })
}

const app = express()

// Body parser
app.use(express.json())

// CORS
app.use(
  cors({
    origin: '*',
  }),
)

// Serve static files (uploaded images)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadDir));

// API routes
app.use('/api/user', userRoutes)

// Middleware
app.use(notFound)
app.use(errorHandler)

// Start the Express server
const PORT = parseInt(process.env.PORT || '5001', 10)
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})