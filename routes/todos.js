const express = require('express');
const auth = require('../middleware/auth');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.post('/', auth, todoController.createTodo);
router.get('/', auth, todoController.getTodos);
router.get('/:id', auth, todoController.getTodoById);
router.put('/:id', auth, todoController.updateTodo);
router.delete('/:id', auth, todoController.deleteTodo);

module.exports = router;
