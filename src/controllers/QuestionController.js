module.exports = {
    index(req, res){
        const roomId = req.params.room;
        const questionId = req.params.question;
        const action = req.params.action;
        //senhas vão no corpo da requisição, o "password" é a propriedade "name" do campo dentro do form no html
        const password = req.body.password;

        console.log(`Sala: ${roomId}, Questão: ${questionId}, Ação: ${action}, Senha: ${password}`);
    }
}