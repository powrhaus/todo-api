var express = require('express');
var app = express();
var PORT = process.env.PORT || 3111;
var todos = [{
    id: 1,
    description: 'Go to Movie',
    completed: false
}, {
    id: 2,
    description: 'Get a job',
    completed: false
},{
    id: 3,
    description: 'Watch Cowboys pre-season game 2',
    completed: true
}];

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
    todos.forEach(item =>{
        if (item.id === todoID) {
            res.json(item);
        }
    });
    res.status(404).send();
});

app.listen(PORT, function(){
    console.log('Server listening on port: '+ PORT);
});