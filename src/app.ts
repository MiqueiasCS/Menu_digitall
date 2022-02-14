import 'reflect-metadata'
import express from 'express'
import { connectDatabase } from './Database'
import { initializerRouter } from './Routes'
import { errorHandler } from './Middlewares/handleErrors'

connectDatabase()

const app = express()

app.use(express.json())

initializerRouter(app)

app.use(errorHandler)

export default app
