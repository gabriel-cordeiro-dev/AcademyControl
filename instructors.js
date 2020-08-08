const fs = require('fs');
const data = require('./data.json')
const { age, date } = require('./utils')

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
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
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
        created_at,
    }) // aqui ele retorna um array com um objeto dentro [{...}]

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write File error')

        return res.redirect('/instructors')
    })

    //return res.send(req.body)
}
//update
exports.edit = function (req, res){
    //req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor){
        return instructor.id == id
    })

    if(!foundInstructor) return res.send('Instructor not found')

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }
    

    return res.render('instructors/edit', {instructor})
}

exports.put = function (req, res){
    //req.body
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function (instructor, foundIndex){
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundInstructor) return res.send('Instructor not found')

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write error!')

        return res.redirect(`/instructors/${id}`)
    })
}

//delete instructor
exports.delete = function (req, res){
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write file error')
        
        return res.redirect('/instructors')
    })
}