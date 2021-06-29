const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql2')
const handleBars = require('express-handlebars')

const app = express()

app.listen(3000, () => {
    console.log('Server is running...')
})