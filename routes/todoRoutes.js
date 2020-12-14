const {Router} = require('express');
const router = Router();
const Todo = require('../models/Todo');
const TodoList = require('../models/TodoList');
const auth = require('../middleware/sign.middleware');
const config = require('config');


router.get('/list', auth, async (req,res)=>{
    try{
        const todoList = await TodoList.find({owner: req.user.userId});
        res.json({todoList})
    }
    catch(e)
    {
        res.status(500).json({message: 'Something went wrong, please try again'});
    }
});

router.post('/add', auth, async (req, res)=>{

    try{
        const {title} = req.body;
        const todo = new TodoList({title, owner: req.user.userId});
        
        await todo.save();
        res.status(201).json({todo});
    }
    catch(e)
    {
        res.status(500).json({message: 'Something went wrong, please try again'});
    }
});

router.post('/remove', auth, async (req,res)=>{
    try{
        const {id} = req.body;
        const todo = await TodoList.findByIdAndRemove(id);
        await Todo.deleteMany({owner: id});
        res.status(201).json({todo});
    }
    catch(e)
    {
        res.status(500).json({message: 'Something went wrong, please try again'});
    }
});


router.get('/:id', auth, async (req,res)=>{
    try{
        const todos = await Todo.find({owner:req.params.id});
        res.json({todos})
    }
    catch(e)
    {
        res.status(500).json({message: 'Something went wrong, please try again'});
    }
});

router.post('/todoAdd', auth, async (req, res)=>{
    try{
        const {title,owner} = req.body;
        const todo = new Todo({title, owner});
        
        await todo.save();
        res.status(201).json({todo});
    }
    catch(e)
    {
        res.status(500).json({message: 'Something went wrong, please try again'});
    }
});

router.post('/removeTodo', auth, async (req,res)=>{
    try{
        const {id} = req.body;
        const todo = await Todo.findByIdAndRemove(id);
        res.status(201).json({todo});
    }
    catch(e)
    {
        res.status(500).json({message: 'Something went wrong, please try again'});
    }
});

router.post('/complete', auth, async (req,res)=>{
    try{
        const {id} = req.body;
        const todo = await Todo.findById(id);
        const switchCompleted = !todo.completed;
        todo.completed = switchCompleted
        await todo.save();
        res.status(201).json({todo});
    }
    catch(e)
    {
        res.status(500).json({message: 'Something went wrong, please try again'});
    }
});
module.exports = router;