const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('mysql2')
const morgan = require('morgan')
const handleBars = require('express-handlebars')
const urlEncondeParser = bodyParser.urlencoded({ extended: false })
const multer = require('multer')

const sql = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '311020vra'
})

sql.query('use nodejs')

const app = express()

app.use(morgan('dev'))
app.engine('handlebars', handleBars({ defaultLayout: `main`}))
app.use('/img', express.static('views/img/'))
app.set('view engine', 'ejs')
app.set('view engine', 'handlebars')
app.use('/style', express.static('views/'))


const upload = multer({dest: 'uploads/'})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/inserir', (req, res) => {
    res.render('inserir')
})

app.post('/controllerForm', urlEncondeParser, (req, res) => {
    sql.query('insert into produto values (?,?,?,?,?,?,?);',[req.body.id, req.body.nome, req.body.valor, req.body.cor, req.body.tamanho, req.body.categoria, req.body.tipo])
    res.render('controllerForm', {nome:req.body.nome})
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

app.listen(3000, () => {
    console.log('Server is running...')
})