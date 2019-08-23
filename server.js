var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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
    var matchedTodo = _.findWhere(todos,{id: todoID});

    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
});

app.post('/todos', function(req,res){
    var body = _.pick(req.body, 'completed', 'description');

    
    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
        return res.status(400).send();
    }

    body.description = body.description.trim();

    body.id = todoNextId++;
    todos.push(body);
    
    res.json(body);

});

//  DELETE /todos/:id  - remove a single TODO
app.delete('/todos/:id', function(req,res){
    var todoID = parseInt(req.params.id,10);
    var matchedTodo = _.findWhere(todos,{id: todoID});
    
    if (!matchedTodo){
        res.status(404).json({"error": "No ToDo found with that ID"});
    } else {
        todos = _.without(todos,matchedTodo);
        res.json(matchedTodo);
    }

});

app.listen(PORT, function(){
    console.log('Server listening on port: '+ PORT);
});