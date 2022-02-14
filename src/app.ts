import 'reflect-metadata'
import express from 'express'
import { connectDatabase } from './Database'
import { initializerRouter } from './Routes'

connectDatabase()

const app = express()

app.use(express.json())

initializerRouter(app)

export default app
