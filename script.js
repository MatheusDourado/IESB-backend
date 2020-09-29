const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid').v4;
const jwt = require("jsonwebtoken");
const secret = 'iesb';
let http = require('http')

app.use(express.json())
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

let tasks = [];


//http://localhost:3000


app.get('/', (request, response) => {
	// response.sendFile(__dirname + '/index.html')
	response.send({'message':'ok'})
});


app.use((request, response, next) => {
	console.log('url', request.url);

	if (request.url == '/login') {
		next()
		return false
	}

	let token = request.headers['x-access-token'];

	try {
		jwt.verify(token, secret)
		next()
	} catch (error) {
		response.status(401).send({
			message: "Token invalido"
		});
		return
	}
	next()
})


app.post('/login', (request, response) => {
	if (request.body.username == 'usuario' && request.body.password == '123456') {
		const token = jwt.sign({
			username: "usuario",
			password: "123456",
			role: 'admin'
		}, secret, {
			expiresIn: '1h'
		});
		return response.json({ auth: true, token });
	} else if (response.status(401)) {
		response.status(401).send({message: "Error in username or password" });
		return true
	}



})


app.get('/tasks', (request, response) => {
	response.send(tasks)
});



app.get('/tasks/:taskId', (request, response) => {

	const task = tasks.find(t => t.id == request.params.taskId)
	if (task) {
		response.status(200)
		response.send(task)
	} else {
		response.status(404)
		response.send()
	}
});




app.post('/tasks', (request, response) => {
	// const body = request.body;
	const task = {
		id: uuid(),
		title: request.body.title,
		description: request.body.description,
		isDone: request.body.isDone,
		isPriority: request.body.isPriority
	};

	console.log('Adicionado nova tarefa ' + request.body.title)

	tasks.push(task)
	response.status(201)
	response.send(task)
});




app.put('/tasks/:taskId', (request, response) => {


	const task = tasks.find(t => t.id == request.params.taskId)
	if (task) {
		task.title = request.body.title
		task.description = request.body.description
		task.isDone = request.body.isDone
		task.isPriority = request.body.isPriority
		response.send(task)
	} else {
		response.status(404)
		response.send()
	}
});




app.delete('/tasks/:taskId', (request, response) => {
	let task = tasks.find(t => t.id == request.params.taskId)
	if (task) {
		tasks = tasks.filter(t => t.id != request.params.taskId)
		response.status(200).send(task)
	} else {
		response.status(404).send()
	}
});


app.listen(3000, () => {
	console.log('Servidor Rodando')
});