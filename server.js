const express = require('express');
const connectDB = require('./config/db')
var cors = require('cors')

const app = express();
app.use(cors())
connectDB()

// init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.json({ message: 'hello, this is the contact keeper api' }))

//define our routs

app.use('/api/auth', require('./routs/auth'))
app.use('/api/users', require('./routs/users'))
app.use('/api/drops', require('./routs/drops'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`serer started on port ${PORT}`))