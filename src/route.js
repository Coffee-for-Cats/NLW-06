const express = require("express")
const route = express.Router()

const QuestionController = require("./controllers/QuestionController");
const RoomController = require("./controllers/RoomController")


route.get('/', (req, res)=> res.render('index', {page: 'enter-room'})) //index + home
route.get('/create-pass', (req, res)=> res.render('index', {page: 'create-pass'})) //index + pass

route.post('/create-room', RoomController.create) //Cria a sala
route.get('/room/:room', RoomController.open) //Carrega a sala
route.post('/enter-room', RoomController.enter) //Entra na Sala pelo Menu principal

route.post('/question/create/:room', QuestionController.create)//Recebe as mensagens
route.post('/question/:room/:question/:action', QuestionController.index) //Formato do Formulário da Modal

module.exports = route;