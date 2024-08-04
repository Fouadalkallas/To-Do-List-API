const Todo = require('../models/Todo');

// Create a to-do
exports.createTodo = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTodo = new Todo({
            title,
            description,
            userId: req.user,
        });
        const todo = await newTodo.save();
        res.json(todo);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get all to-dos with pagination, filtering, and sorting
exports.getTodos = async (req, res) => {
    const { page = 1, limit = 10, sort = 'createdAt', order = 'asc', search = '' } = req.query;
    const query = {
        userId: req.user,
        title: { $regex: search, $options: 'i' }
    };
    try {
        const todos = await Todo.find(query)
            .sort({ [sort]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(todos);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get a single to-do by ID
exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: 'To-do not found' });
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update a to-do
exports.updateTodo = async (req, res) => {
    const { title, description } = req.body;
    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: 'To-do not found' });
        }
        if (todo.userId.toString() !== req.user) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        todo = await Todo.findByIdAndUpdate(req.params.id, { $set: { title, description } }, { new: true });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({ message: 'ToDo not found' });
        }

        res.json({ message: 'ToDo deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
