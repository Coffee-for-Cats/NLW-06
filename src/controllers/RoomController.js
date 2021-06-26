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
                ) VAlUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`);
            }
        }

        await db.close();

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)

        let isNoQuestions;

        isNoQuestions = questions.length == 0 && questionsRead.length == 0 ? true : false;

        //console.log(questions.length);

        res.render('room',{roomId, questions, questionsRead, isNoQuestions})
    },

    enter(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}