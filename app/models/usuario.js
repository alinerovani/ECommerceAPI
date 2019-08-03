const mongoose = require('mongoose');

const schemaUsuario = mongoose.Schema(
    {
        nome: String,
        email: String
    }
);

//Vamos criar um modelo
//Se não especificar o terceiro parâmetro o mongo vai tentar localizar uma tabela chamada usuarios, no plural
//Passando o 3º parâmetro ele busca pelo nome exato da tabela
const usuario = mongoose.model('usuario', schemaUsuario, 'usuario');

module.exports = usuario;