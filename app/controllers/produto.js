const mongoose = require('mongoose');
const produto = require('../models/produto');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    listarTudo: function (req, res) {
        produto.find(function (error, produtos) {
            if (error) {
                res.send('Erro ao tentar recuperar os produtos', error);
            } else {
                res.json(produtos);
            }
        });
    },
    listarUm: function (req, res) {
        produto.findById(ObjectId(req.params.id), function (error, prod) {
            if (error) {
                res.send('Erro ao tentar recuperar o produto ' + req.params.id, error);
            } else if (prod) {
                res.json(prod);
            } else {
                res.json(
                    { message: 'Produto com ID ' + req.params.id + ' não encontrado' }
                );
            }
        });
    },
    adicionar: function(req, res) {

        let prod = new produto(req.body);

        prod.save(function (error) {
            if (error) {
                res.send('Erro ao gravar o produto' + error);
            } else {
                res.json({ message: 'Produto cadastrado com sucesso' });
            }
        });
    },
    alterar: function (req, res) {
        //Recupera o registro para alterar
        produto.findById(ObjectId(req.params.id), function (error, produto) {
            if (error) {
                res.send('Erro ao tentar recuperar o produto ' + req.params.id, error);
            } else if (produto) {

                if (req.body.nome)
                    produto.nome = req.body.nome;
                if (req.body.preco)
                    produto.preco = req.body.preco;
                if (req.body.descricao)
                    produto.descricao = req.body.descricao;
                if (req.body.quantidadeEstoque)
                    produto.quantidadeEstoque = req.body.quantidadeEstoque;

                //persiste as alterações no banco
                produto.save(function (error) {
                    if (error) {
                        res.send('Erro ao alterar o produto' + error.message);
                    }
                    res.json(
                        { message: 'Produto alterado com sucesso' }
                    )
                });
            } else {
                res.json(
                    { message: 'Produto com ID ' + req.params.id + ' não encontrado' }
                );
            }
        })
    },
    excluir: function (req, res) {
        let id = req.params.id;

        produto.deleteOne(
            { _id: ObjectId(id) },
            function (error, resultado) {
                if (error) {
                    res.send('Erro ao excluir o produto' + error.message)
                } else if (resultado.n == 0) {
                    res.json(
                        { message: 'Produto informado não existe' }
                    )
                } else {
                    res.json(
                        { message: 'Produto excluído com sucesso' }
                    );
                }
            }
        )
    }
}