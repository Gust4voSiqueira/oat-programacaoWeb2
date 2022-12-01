const mongoose = require('mongoose')

const clanSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Clan', clanSchema)