const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql2')
const morgan = require('morgan')
const handleBars = require('express-handlebars')
const urlEncondeParser = bodyParser.urlencoded({ extended: false })

const sql = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '311020'
})

sql.query('use nodejs')

const app = express()

app.use(morgan('dev'))
app.engine('handlebars', handleBars({ defaultLayout: `main`}))
app.set('view engine', 'handlebars')
/* app.use('/css', express.static('css'))
app.use('/javascript', express.static('js')) */

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/inserir', (req, res) => {
    res.render('inserir')
})

app.post('/controllerForm', urlEncondeParser, (req, res) => {
    sql.query('insert into user values (?,?,?);',[req.body.id, req.body.name, req.body.age])
    res.render('controllerForm', {nome:req.body.name})
})

app.get('/select/:id?', (req, res) => {
    if (!req.params.id) {
        sql.query('select * from user', (err, result, fields) => {
            res.render('select', {data:result})
        })
    } else {
        sql.query('select * from user where id=?;',[req.params.id], (err, result, fields) => {
            res.render('select', {data:result})
        })
    }
})  

app.get('/delete/:id', (req, res) => {
    sql.query('delete from user where id=?', [req.params.id])
    res.render('delete')
})

/* app.get('/style', (req, res) => {
    res.sendFile(__dirname+'style.css')
})

app.get('/javascript', (req, res) => {
    res.sendFile(__dirname+'javascript.js')
})
 */

app.listen(3000, () => {
    console.log('Server is running...')
})