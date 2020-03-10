var express = require('express');
var router = express.Router();
var database = require('../database/models/index')

router.get('/', async function(req, res, next) {
  const databaseResponse = await database.TodoList.findAll({
  include: 'TodoItems'})
  return res.status(200).json(databaseResponse)
});

router.post('/', async function(req, res, next) {
  const newItem = req.body
  
  const databaseResponse = await database.TodoList.create(newItem, {
    include: [{
      model: database.TodoItem,
      as: 'TodoItems'
    }]}).then((newCreatedTodoList) => newCreatedTodoList.reload())
  return res.status(201).json(databaseResponse)
})

router.post('/:todoListId/todo', async function(req, res, next) {
  const todoList = req.params.todoListId;
  const newItem = req.body
  console.log('ASFEW',newItem)
  const databaseResponse = await database.TodoItem.create({...newItem, todoId:req.params.todoListId})
  return res.status(201).json(databaseResponse)
})

router.delete('/:todoListId/todo/:todoId', async function(req, res, next) {
  const todoListOfTodo = req.params.todoListId;
  const itemDeleted = req.params.todoId
  const databaseResponse = await database.TodoItem.destroy({where: {id: itemDeleted, todoId: todoListOfTodo}})
  return res.status(204).json(databaseResponse)
})

router.put('/:todoListId/todo/:todoId', async function(req, res, next) {
  const todoListOfTodo = req.params.todoListId;
  const itemModified = req.params.todoId
  const databaseResponse = await database.TodoItem.update({ ...req.body}, {where: {id: itemModified, todoId: todoListOfTodo}})
  return res.status(204).json(databaseResponse)
})

router.delete('/:todoListId', async function(req, res, next) {
  const itemDeleted = req.params.todoListId
  const databaseResponse = await database.TodoList.destroy({where: {id: itemDeleted}})
  return res.status(204).json(databaseResponse)
})

module.exports = router;
