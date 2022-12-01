const mongoose = require('mongoose')

//credentials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const mongodbUrl = `mongodb+srv://gustavo:FCG9OZwLo634cVSk@cluster0.9r4c80t.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(mongodbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    user: 'gustavo',
    pass: 'FCG9OZwLo634cVSk'
})
.then(() => {
    console.log("Conectou ao banco")
})
.catch((err) => {
    console.log(err)
})

const db = mongoose.connection

db.on('error', (err) => console.error(`Error: ${err}`))
db.on('connected', (err, res) => console.log('Connected to database'))