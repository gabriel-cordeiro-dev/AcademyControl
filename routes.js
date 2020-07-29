const express = require('express')
const routes = express.Router()

routes.get('/', function (req, res){
    return res.redirect('/instructors')
})

routes.get('/instructors', function (req, res){
    return res.render('instructors/index')
})

routes.get('/instructors/create', function (req, res){
    return res.render('instructors/create')
})

//usando o metodo post, tem que usar o req.body, se fosse metedo get, usaria req.query
routes.post('/instructors', function (req, res){
    
    //realizando uma estrutura de validação
    const keys = Object.keys(req.body)//o keys criou um array com as chaves dos objetos

    for(key of keys){
       if (req.body[key] == ""){
          return res.send('Please, fill all fields') 
       }
    }

    return res.send(req.body)
})

routes.get('/members', function (req, res){
    return res.send('members')
})

module.exports = routes