const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
const routes = require('./routes');
const hateoasLinks = require('express-hateoas-links');

const usuario = require('./app/models/usuario');

const porta = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://mongo:15974@cluster0-wkzjk.mongodb.net/ECommerce?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(hateoasLinks)

//Middleware da aplicação, toda requisição passará aqui
app.use(function (req, res, next) {
    console.log('Algo está acontecendo aqui', req.url);
    //A chamada do método next garante que o próximo comando seja executado
    next();
});

app.get('/', function (req, res) {
    res.send('Bem-vindo a nossa loja virtual');
});

app.get('/usuarios', function (req, res) {
    usuario.find(function (error, usuarios) {
        if (error) {
            res.send('Erro ao tentar recuperar os usuários', error);
        } else {
            res.json(usuarios);
        }
    });
});

app.use('/ecommerce', routes(router));

app.listen(porta, function (req, res) {
    console.log('Servidor inicializado na porta', porta);
});