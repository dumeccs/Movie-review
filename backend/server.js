import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1/movies", movies) // what is this line of code really doing? the first argument really just
                                // the beginning part of every route coming from movies


app.use('*', (req, res) => {
    res.status(400).json({error:"page not found"})
})


export default app