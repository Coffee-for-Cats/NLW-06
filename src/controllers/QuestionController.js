const Database = require('../db/config')
const Encoder = require('html-entities')

module.exports = {
    async index(req, res){
        const db = await Database()

        const roomId = req.params.room;
        const questionId = req.params.question;
        const action = req.params.action;
        //senhas vão no corpo da requisição, o "password" é a propriedade "name" do campo dentro do form no html
        const password = req.body.password;

        /* Verificar se a senha está correta */
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = "${roomId}" `)

        if(verifyRoom.pass == password) {
            if(action == "delete") {
                //coisas de delete
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            } else if (action == "check") {
                //Coisas de check
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }
            
            res.redirect(`/room/${roomId}`)
        } else {
            //carrega a página de erro com o texto correto.
            const errorText = "Senha incorreta!"
            const errorDestination = `/room/${roomId}`
            res.render('error', {errorDestination, errorText})
        }
    },

    async create(req, res){
        const db = await Database()
        let question = req.body.question
        const roomId = req.params.room

        if(question && typeof roomId == 'string') {
            //Troca os ' por ". Isso é questão de segurança (⌐■_■)
            question = question.replace(`'`, `' || char(38) || '`);
    
            await db.run(`INSERT INTO questions(
                title,
                room,
                read
            ) VALUES (
                '${question}',
                ${roomId},
                0
            )`)
    
            res.redirect(`/room/${roomId}`)
        } else {
            res.render('error', { 
                errorText:'Algo deu errado e isso não deveria acontecer. Contate o Desenvolvedor.', 
                errorDestination: '/' 
            })
        }

    }
}