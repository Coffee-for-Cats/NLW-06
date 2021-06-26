//const { open } = require('sqlite')
const Database = require('../db/config')

module.exports = {
    async create(req, res) {
        const db = await Database()
        const pass = req.body.password
        let roomId = ""
        let isRoom = true

        while(isRoom){
            //Gera o número da sala
            for(var i = 0; i < 6; i++) {
                roomId += Math.floor(Math.random() * 10).toString()
            }
            //Verifica se o número já existe
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
    
            isRoom = roomsExistIds.some(roomExistId => roomExistId == roomId)

            //console.log(`${roomId}, e ${pass}`)
        
            //Insere a sala no banco de dados
            if(!isRoom){
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`);
            }
        }

        await db.close();

        res.redirect(`/room/${roomId}`)
    },

    //Abre de fato a sala
    async open(req, res) {
        const db = await Database()
        const roomId = req.params.room

        //Se a sala existir
        const roomsExistIds = await db.all(`SELECT id FROM rooms`)
        if(roomsExistIds.some( roomExistId => roomExistId = roomId )) {
            
            //Carrega a sala
            const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
            const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)

            let isNoQuestions;

            isNoQuestions = questions.length == 0 && questionsRead.length == 0 ? true : false;

            res.render('room',{roomId, questions, questionsRead, isNoQuestions})
        } else {

            //Retorna erro
            const errorText = "Sala inexistente!"
            const errorDestination = "/"
            res.render('error', {errorText, errorDestination})
        }
    },

    //Tela inicial, redireciona para o caminho do Open
    enter(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}