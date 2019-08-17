const mongoose = require('mongoose');

const schemaProduto = mongoose.Schema(
    {
        nome: String,
        preco: Number,
        descricao: String,
        quantidadeEstoque: Number
    }
);

const produto = mongoose.model('produto', schemaProduto, 'produto');

module.exports = produto;