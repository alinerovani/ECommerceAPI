const cupomDescontoController = require('./app/controllers/cupomDesconto');
const produtoController = require('./app/controllers/produto');

module.exports = function (router) {

    //Criar rotas para o Router
    //Rotas que terminam com /cupons (serve para POST e GET ALL)

    //########################### CUPONS ######################
    router.route('/cupons')
    .post(cupomDescontoController.adicionar)
    .get(cupomDescontoController.listarTudo);

    router.route('/cupons/:id')
        .get(cupomDescontoController.listarUm)
        //Altera um registro
        .put(cupomDescontoController.alterar)
        //Alteração parcial de um objeto
        .patch(cupomDescontoController.alterarParcial)
        //Faz a exclusão de um único registro
        //tem que pôr os dois pontos ":" para ele entender que é um parâmetro
        .delete(cupomDescontoController.excluir);

    //########################### PRODUTOS ######################
    router.route('/produtos')
        .post(produtoController.adicionar)
        .get(produtoController.listarTudo);

    //tem que pôr os dois pontos ":" para ele entender que é um parâmetro
    router.route('/produtos/:id')
        .get(produtoController.listarUm)
        //Altera um registro
        .put(produtoController.alterar)
        //Faz a exclusão de um único registro
        .delete(produtoController.excluir);

    return router;
}