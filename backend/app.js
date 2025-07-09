require("dotenv").config()
const routes = require("./routes")
const cors = require("cors")
const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const port = 3001;
const app = express()

app.use(cors({
    origin: "http://localhost:5173", // Твой клиентский домен
    credentials: true
}));

app.use(cookieParser())
app.use(express.json())

app.use("/api", routes)

app.use(express.static("../frontend/dist"));
// app.use("/img", express.static(path.join(__dirname, "public", "img")))

// app.get(/^\/(?!api).*/, (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
// })

mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on port ${ port }`);
        });
    });