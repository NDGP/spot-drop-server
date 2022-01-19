const mongoose = require('mongoose')

const DropSchema = mongoose.Schema({
    user: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
    },
    title: {
        type: String
    },
    file: {
        type: string,
        required: true
    },
    location: {
        type : Point,
        coordinates : [],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('drops', DropSchema)