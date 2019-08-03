const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usuario = require('./app/models/usuario');
const CupomDesconto = require('./app/models/cupomDesconto');

const porta = 3000;

mongoose.connect('mongodb+srv://mongo:15974@cluster0-wkzjk.mongodb.net/ECommerce?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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

app.post('/cupons', (req, res) => {
    let cupomDesconto = new CupomDesconto(req.body);

    // CupomDesconto.dataInicial = req.body.dataInicial;
    // CupomDesconto.dataFinal = req.body.dataFinal;
    // CupomDesconto.valorInicial = req.body.valorInicial;
    // CupomDesconto.valorFinal = req.body.valorFinal;
    // CupomDesconto.quantidadeCupons = req.body.quantidadeCupons;
    // CupomDesconto.quantidadeUsada = req.body.quantidadeUsada;
    // CupomDesconto.percentualDesconto = req.body.percentualDesconto;

    cupomDesconto.save(function (error) {
        if (error) {
            res.send('Erro ao gravar cupom de desconto' + error);
        } else {
            res.json({message: 'Cupom de desconto cadastrado com sucesso'});
        }
    });
});

app.get('/cupons', function (req, res) {
    CupomDesconto.find(function (error, cupons) {
        if (error) {
            res.send('Erro ao tentar recuperar os cupons', error);
        } else {
            res.json(cupons);
        }
    });
});

app.listen(porta, function (req, res) {
    console.log('Servidor inicializado na porta', porta);
});