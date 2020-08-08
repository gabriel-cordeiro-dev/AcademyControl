const express = require('express')// requisitando o express
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()//inserindo o express no server

server.use(express.urlencoded({ extended: true }))// responsavel por fazer funcionar o req.body
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

//configurando template engine
server.set('view engine', 'njk')
nunjucks.configure('views', {
    express:server,
    autoescape: false,
    noCache: true
})



//configurar servidor na porta 5000
server.listen(5000, function () {
    console.log('server is running')
})