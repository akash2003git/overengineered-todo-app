const Todo = require("../models/Todo");
const { todoSchema } = require("../utils/validationSchemas");
const { z } = require("zod");

async function getTodos(req, res) {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ todos });
  } catch (err) {
    console.error("Error fetching todos:", err.message);
    res
      .status(500)
      .json({ message: "Server error fetching todos", error: err.message });
  }
}

async function createTodo(req, res) {
  try {
    const { title, description, completed } = todoSchema.parse(req.body);

    const todo = await Todo.create({
      user: req.user._id,
      title,
      description,
      completed,
    });

    res.status(201).json({ message: "Todo created successfully", todo });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Validation failed:", err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors: err.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    console.error("Error creating todo:", err.message);
    res
      .status(500)
      .json({ message: "Sever error creating todo", error: err.message });
  }
}

async function updateTodo(req, res) {
  try {
    const todoId = req.params.id;
    const updates = todoSchema.partial().parse(req.body);
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this todo" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, updates, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ updatedTodo });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Zod validation error during todo update: ", err.message);
      return res.status(400).json({
        message: "Validation failed for todo update",
        errors: err.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    console.error("Error updating todo:", err);
    res
      .status(500)
      .json({ message: "Server error updating todo", error: err.message });
  }
}

async function deleteTodo(req, res) {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this todo" });
    }

    await Todo.deleteOne({ _id: todoId });
    res.status(200).json({ message: "Todo removed successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res
      .status(500)
      .json({ message: "Server error deleting todo", error: err.message });
  }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
