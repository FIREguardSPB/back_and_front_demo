import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './route/apiRoutes.js'
import path from 'path'
import dotEnv from "dotenv"
import cors from "cors"
dotEnv.config()
const app = express();
const DB_URL = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.ml5bu.mongodb.net/myBase?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '..', 'project','build')))
app.use('/api', apiRouter)
async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log(`server working on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

startApp()

