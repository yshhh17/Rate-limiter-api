import express from 'express'
import rateLimiter from './middleware/rateLimiter.js'
import apiroutes from './routes/api.js';

const app = express();
const port = 3000;
app.use('/api', rateLimiter, apiroutes)

app.listen(port, ()=> {
    console.log("Server running on port 3000")
})