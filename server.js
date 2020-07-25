const express = require('express')// requisitando o express
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()//inserindo o express no server

server.use(express.static('public'))
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