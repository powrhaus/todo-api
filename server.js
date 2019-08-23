var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3111;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send('ToDo API root');
});

//  GET /todos  - get all TODOs
app.get('/todos', function(req,res){
    res.json(todos);
});

//  GET /todos/:id  - a single TODO
app.get('/todos/:id', function(req,res){
    var todoID = parseInt(req.params.id,10);
    var matchedTodo;

    todos.forEach(function(item) {
        if (item.id === todoID) {
            matchedTodo = item;
        }
    });
    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
});

app.post('/todos', function(req,res){
    var body = req.body;
    console.log('description: ' + body.description);
    body.id = todoNextId++;
    todos.push(body);
    
    res.json(body);

});

app.listen(PORT, function(){
    console.log('Server listening on port: '+ PORT);
});