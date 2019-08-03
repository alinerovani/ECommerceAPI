const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaCupom = new Schema(
    {
        dataInicial: Date,
        dataFinal: Date,
        valorInicial: Number,
        valorFinal: Number,
        quantidadeCupons: Number,
        quantidadeUsada: Number,
        percentualDesconto: {
            type: Number,
            required : [true, 'Informe o percentual de desconto']
        }
    }
);

//Vamos criar um modelo
//Se não especificar o terceiro parâmetro o mongo vai tentar localizar uma tabela chamada cupomDescontos, no plural
//Passando o 3º parâmetro ele busca pelo nome exato da tabela
const CupomDesconto = mongoose.model('CupomDesconto', schemaCupom, 'CupomDesconto');

module.exports = CupomDesconto;