require("dotenv").config()
const routes = require("./routes")
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const port = 3001;
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser())
app.use(express.json())

app.use("/api", routes)

app.use(express.static("../frontend/dist"));

mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(port, "0.0.0.0", () => {
            console.log(`Server started on port ${ port }`);
        });
    });