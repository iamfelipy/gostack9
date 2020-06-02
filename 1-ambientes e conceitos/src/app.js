const express = require('express');

const app = express();

app.use(express.json());

let usersNames = ['Felipy', 'Marcelo', 'Julian', 'Carlos'];

function checkUserExists(req, res, next){
    if( !req.body.name ){
        return res.status(404).json({error: 'User name is required.'});
    }

    return next();
}

function checkUserInArray(req, res, next){

    const {id} = req.params;
    if( !usersNames[id] ){
        return res.status(404).json({error: 'Usuário não existe.'});
    }

    return next();
}

app.get('/user', (request, response) => {
    
    return response.status(200).json(usersNames);
});

app.get('/user/:id', checkUserInArray, (request, response) => {
    const {id} = request.params;
    
    return response.json({message: `Olá ${usersNames[id]}.`});
});

app.post('/user', checkUserExists, (request, response)=>{
    
    const {name} = request.body;

    usersNames.push(name);

    return response.status(201).json({message: `Usuário ${name} adicionado a lista.`});
});

app.put('/user/:id', checkUserInArray, checkUserExists, (request, response) => {

    const {id} = request.params;
    const {name} = request.body;

    usersNames[id] = name;
    
    return response.status(200).json({message: `Novo nome: ${usersNames[id]}`});
});

app.delete('/user/:id', checkUserInArray, (request, response) => {

    const {id} = request.params;
    const userDelete = usersNames.splice(id, 1); 

    return response.status(200).json(`Usuário deletado ${userDelete}`);
});

app.listen(3333, () => console.log('back-end iniciado.'));