const express = require('express')
const route = require('./route')
const path = require('path')

const server = express();

server.set('view engine', 'ejs');
server.use(express.static("public"));
server.set('views', path.join(__dirname, 'views'));

server.use(express.urlencoded({extended: true}))

server.use(route);

server.listen(3000, ()=> { console.log("rodando!") })

//server.set = modificar as configurações padrões do Express
//server.use = definir algo no Express, não entendi muito bem mas vou pesquisar mais depois.