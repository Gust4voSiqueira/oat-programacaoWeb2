const mongoose = require('mongoose')

const villageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Village', villageSchema)