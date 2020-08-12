const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res){
        return res.render('instructors/index')
    },
    create(req, res){
        return res.render('instructors/create')
    },
    post(req, res){
        //realizando uma estrutura de validação
        const keys = Object.keys(req.body)//o keys criou um array com as chaves dos objetos

        for(key of keys){
            if (req.body[key] == ""){
                return res.send('Please, fill all fields') 
            }
        }

        let {avatar_url,birth,name,services,gender} = req.body //desestruturando o req.body

        return
        
    },
    show(req, res){
        return
    },
    edit(req, res){
        return
    },
    put(req, res){
        const keys = Object.keys(req.body)//o keys criou um array com as chaves dos objetos

        for(key of keys){
            if (req.body[key] == ""){
                return res.send('Please, fill all fields') 
            }
        }

        return
    },
    delete(req, res){
        return
    },
}
