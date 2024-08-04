import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

const corsOptions = {
    origin: "http://localhost:5173", 
    credentials: true, 
  };
  

app.use(cors(corsOptions));

app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: true, limit:"50mb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
import bookRouter from "./routes/book.routes.js"

app.use("/users",userRouter)
app.use("/books",bookRouter)

export {app}