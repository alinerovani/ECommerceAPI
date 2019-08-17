const mongoose = require('mongoose');
const CupomDesconto = require('../models/cupomDesconto');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    listarTudo: function (req, res) {
        CupomDesconto.find(function (error, cupons) {
            if (error) {
                res.status(502).json({ message: 'Erro ao tentar recuperar os cupons' + error.message });
            } else {
                res.statusCode = 200;
                res.json(cupons);
            }
        });
    },
    adicionar: function (req, res) {
        let cupomDesconto = new CupomDesconto(req.body);

        // CupomDesconto.dataInicial = req.body.dataInicial;
        // CupomDesconto.dataFinal = req.body.dataFinal;
        // CupomDesconto.valorInicial = req.body.valorInicial;
        // CupomDesconto.valorFinal = req.body.valorFinal;
        // CupomDesconto.quantidadeCupons = req.body.quantidadeCupons;
        // CupomDesconto.quantidadeUsada = req.body.quantidadeUsada;
        // CupomDesconto.percentualDesconto = req.body.percentualDesconto;

        cupomDesconto.save(function (error, novoCupom) {
            if (error) {
                res.statusCode = 500;
                res.json(error);
            } else {
                let url = req.protocol + '://' + req.get('host') + req.originalUrl;

                res.status(201).json({ message: novoCupom }, 
                    [{ rel: "recuperar", method: "GET", href: url + novoCupom._id, title: 'Recuperar cupom de desconto' }
                    ]);
            }
        });
    },
    listarUm: function (req, res) {
        CupomDesconto.findById(ObjectId(req.params.id), function (error, cupomDesconto) {
            if (error) {
                res.statusCode = 502;
                res.json({ message: 'Erro ao tentar recuperar o cupom ' + req.params.id, error });
            } else if (cupomDesconto) {

                let url = req.protocol + '://' + req.get('host') + req.originalUrl;

                //por padrão o código é 200
                //dá as opções de alterar e excluir o registro pesquisado
                res.status(200).json(cupomDesconto,
                    [{ rel: "alterar", href: url, method: "PUT", title: "Alterar cupom de desconto" },
                    { rel: "excluir", href: url, method: "DELETE", title: "Excluir cupom de desconto" }
                    ]);


            } else {
                res.status(202).json(
                    { message: 'Cupom com ID ' + req.params.id + ' não encontrado' }
                );
            }
        });
    },
    alterar: function (req, res) {
        //Recupera o registro para alterar
        CupomDesconto.findById(ObjectId(req.params.id), function (error, CupomDesconto) {
            if (error) {
                res.statusCode = 502;
                res.json(error);
            } else if (CupomDesconto) {

                if (req.body.dataInicial)
                    CupomDesconto.dataInicial = req.body.dataInicial;
                if (req.body.dataFinal)
                    CupomDesconto.dataFinal = req.body.dataFinal;
                if (req.body.valorInicial)
                    CupomDesconto.valorInicial = req.body.valorInicial;
                if (req.body.valorFinal)
                    CupomDesconto.valorFinal = req.body.valorFinal;
                if (req.body.quantidadeCupons)
                    CupomDesconto.quantidadeCupons = req.body.quantidadeCupons;
                if (req.body.quantidadeUsada)
                    CupomDesconto.quantidadeUsada = req.body.quantidadeUsada;
                if (req.body.percentualDesconto)
                    CupomDesconto.percentualDesconto = req.body.percentualDesconto;

                //persiste as alterações no banco
                CupomDesconto.save(function (error) {
                    if (error) {
                        res.statusCode = 500;
                        res.json(error);
                    } else {
                        res.status(200).json(
                            { message: 'Cupom alterado com sucesso' }
                        )
                    }
                });
            } else {
                //204 nao retorna nenhuma mensagem
                res.status(204).json(
                    { message: 'Cupom com ID ' + req.params.id + ' não encontrado' }
                );
            }
        })
    },
    alterarParcial: function (req, res) {
        let id = req.params.id;
        let cupomDesconto = req.body;

        CupomDesconto.updateOne(
            { _id: ObjectId(id) },
            { $set: cupomDesconto },
            function (error) {
                if (error) {
                    res.statusCode = 400;
                    res.json(error);
                } else {
                    res.status(200).json(
                        { message: 'Cupom alterado com sucesso' }
                    );
                }
            }
        )
    },
    excluir: function (req, res) {
        let id = req.params.id;

        CupomDesconto.deleteOne(
            { _id: ObjectId(id) },
            function (error, resultado) {
                if (error) {
                    res.statusCode = 409;
                    res.json(error);
                } else if (resultado.n == 0) {
                    res.status(202).json(
                        { message: 'Cupom informado não existe' }
                    )
                } else {
                    //console.log(resultado);
                    res.status(200).json(
                        { message: 'Cupom excluído com sucesso' }
                    );
                }
            }
        )
    }
}