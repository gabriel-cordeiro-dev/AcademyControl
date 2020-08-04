const fs = require('fs');
const data = require('./data.json')
const { age } = require('./utils')

//show
exports.show = function (req, res){
    //req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor){
        return instructor.id == id
    })

    if(!foundInstructor) return res.send('Instructor not found')


    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(','),
        created_at: "",
    }

    return res.render("instructors/show", {instructor})
}
//create
exports.post = function (req, res){
    
    //realizando uma estrutura de validação
    const keys = Object.keys(req.body)//o keys criou um array com as chaves dos objetos

    for(key of keys){
       if (req.body[key] == ""){
          return res.send('Please, fill all fields') 
       }
    }

    let {avatar_url,birth,name,services,gender} = req.body //desestruturando o req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)// cria uma ID para cada nova entrada de dados

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    }) // aqui ele retorna um array com um objeto dentro [{...}]

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write File error')

        return res.redirect('/instructors')
    })

    //return res.send(req.body)
}
//update

//delete