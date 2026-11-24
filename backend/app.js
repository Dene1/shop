require('dotenv').config()
const path = require('path')
const routes = require('./routes')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 3001
const app = express()

app.use(cors({
	origin: ['http://localhost:5173', 'https://back-shop.onrender.com'],
	credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use('/api', routes)

app.get('/api/weather/:city', async (req, res) => {
	const { city } = req.params
	const apiKey = process.env.OPENWEATHER_CONNECTION_KEY

	const response = await fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=${ city }&units=metric&lang=eng&appid=${ apiKey }`
	)
	const weatherData = await response.json()
	return res.json(weatherData)
})

const frontendPath = path.join(__dirname, '../frontend/dist')
app.use(express.static(frontendPath))

app.use((req, res) => {
	res.sendFile(path.join(frontendPath, 'index.html'))
})

mongoose.connect(process.env.DB_CONNECTION_STRING)
	.then(() => {
		app.listen(port, '0.0.0.0', () => {
			console.log(`Server started on port ${ port }`)
		})
	})
	.catch((err) => {
		console.error('MongoDB connection error:', err)
		process.exit(1)
	})