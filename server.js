const express = require('express')// requisitando o express
const nunjucks = require('nunjucks')

const server = express()//inserindo o express no server
const videos = require('./data')//está referenciando o arquivo na raiz

server.use(express.static('public'))

//configurando template engine
server.set('view engine', 'njk')

nunjucks.configure('views', {
    express:server,
    autoescape: false,
    noCache: true
})

//levar informações do backend para o front, pagina Sobre
server.get('/', function (req,res) {
    const about = {
        avatar_url:"https://avatars0.githubusercontent.com/u/61247355?s=460&u=4",
        name:"Gabriel Cordeiro",
        role:"Desenvolvedor",
        description:"Programador Full-Stack",
        links:[
            { name:"Github", url:"https://github.com/gabriel-cordeiro-dev" },
            { name:"Instagram", url:"https://www.instagram.com/gabrielluuckner/" },
            { name:"Linkedin", url:"https://www.linkedin.com/in/gabriel-cordeiro-033641144/" }
        ]
    }
    return res.render('about', {about: about})
})

server.get('/certificacoes', function (req,res) {

    return res.render('certificacoes', {items: videos})
})

//configurando requisição de video em outro endereço
server.get('/video', function (req,res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render('video', { item: video })
})

//configurar servidor na porta 5000
server.listen(5000, function () {
    console.log('server is running')
})