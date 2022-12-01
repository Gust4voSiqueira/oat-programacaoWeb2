const express = require('express')
const bodyParser = require('body-parser')
const characterRouter = require('./src/routes/characters.routes')
const villagesRoutes = require("./src/routes/villages.routes")
const clansRoutes = require("./src/routes/clan.routes")
const app = express()
const db = require("./src/utils/db")

const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('naruto-api is running \0/')
})

// Characters Routes
app.use('/api/v1/characters', characterRouter)

// Villages Routes
app.use('/api/v1/villages', villagesRoutes)

// Clans Routes
app.use('/api/v1/clans', clansRoutes)

app.listen(port, () => {
    console.log(`naruto-api running on port ${port} \0/`)
})