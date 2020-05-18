const express = require('express');

const App = express();

App.use(express.json());

const usersNames = ['Felipy', 'Marcelo', 'Julian', 'Carlos'];

App.get('/user/:id', (request, response) => {

    const {id} = request.params;

    return response.send(`Olá ${usersNames[id]}.`);
});

App.listen(3333, () => console.log('back-end iniciado.'));