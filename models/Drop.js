const mongoose = require('mongoose')

const DropSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
    title: {
        type: String
    },
    file: {
        type: String,
        required: true
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
    date: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('drops', DropSchema)