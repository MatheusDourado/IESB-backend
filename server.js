const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const uuid = require('uuid').v4;
const database = []

server.use(bodyParser.json())
server.use(bodyParser.text())

//    Body Parser para extrair dados do <form> e adiciona-los ao .bod
server.use(bodyParser.urlencoded({
      extended: true
}))


/*
      Futura API CRUD - Lista de tarefas
*/



//    GET/      => Resposta do servidor
server.get('/', (request, response) => {
      response.sendFile(__dirname + '/index.html')
})


//    GET/tarefas       => Resposta do servidor
server.get('/tarefas', (request, response) => {
      response.send(database);
})


//    POST/tarefa       => Envio do navegador pro servidor 
server.post('/tarefa', (request, response) => {
      const objeto_tarefa = {
            id: uuid(),
            titulo: request.body.titulo,
            descricao: request.body.descricao,
            feito: false,
            prioridade: false
      }

      console.log('Adicionado nova tarefa ' + request.body.titulo);

      database.push(objeto_tarefa)
      response.send(objeto_tarefa)
})


//    PUT/tarefa        => Atualiza atividade do servidor
// server.put('/tarefa/:tarefaId', (request, response) => {
//       const { body } = request;
//       const tarefa = database.find(t => t.id == request.params.tarefaId);
//       if (tarefa) {
//             tarefa.title = body.title;
//             tarefa.description = body.description;
//             tarefa.isDone = body.isDone;
//             tarefa.isPriority = body.isPriority;
//             response.send(tarefa);

//             console.log(tarefa)
//       } else {
//             response.status(404);
//             response.send();
//       }
// });


//    DELETE/tarefa     => Exclui atividade do servidor
server.delete('/tarefas/:tarefaId', (request, response) => {
      let tarefa = database.find(t => t.id == request.params.tarefaId)
      if(tarefa) {
            tasks = tasks.filter(t => t.id != request.params.taskId);response.status(200).send(task) 
      }
})


//   ERRO 404     => Resposta do servidor
server.use('*', (request, response, next) => {
      response.status(404).sendFile(__dirname + '/erro404.html')
})


//    Excutando o servidor na PORTA 7091
server.listen(7091, () => {
      console.log("Servidor funcionando")
})