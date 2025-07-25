const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./src/models/User");
const Todo = require("./src/models/Todo");
const { connectDB } = require("./src/config/db");

dotenv.config({ path: "./.env" });

console.log(
  "MONGO_URI from .env:",
  process.env.MONGO_URI ? "Loaded" : "NOT LOADED",
);

// Connect to the database
connectDB();

const plainTextUsers = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    username: "jane_smith",
    email: "jane@example.com",
    password: "password123",
  },
];

const seedData = async () => {
  try {
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Todo.deleteMany({});
    console.log("Existing data cleared.");

    console.log("Seeding users...");

    const usersToInsert = await Promise.all(
      plainTextUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      }),
    );

    const createdUsers = await User.insertMany(usersToInsert);

    const johnDoe = createdUsers[0]._id;
    const janeSmith = createdUsers[1]._id;
    console.log(
      "Users seeded:",
      createdUsers.map((u) => u.username),
    );

    console.log("Seeding todos...");
    const todos = [
      {
        user: johnDoe,
        title: "Finish backend API for Todo App",
        description: "Implement update and delete routes.",
        completed: true,
      },
      {
        user: johnDoe,
        title: "Start frontend development",
        description: "Set up React, Tailwind, Jotai.",
        completed: false,
      },
      {
        user: johnDoe,
        title: "Write unit tests for backend",
        description: "Test auth and todo endpoints.",
        completed: false,
      },
      {
        user: janeSmith,
        title: "Plan weekend trip",
        description: "Research destinations and book flights.",
        completed: false,
      },
      {
        user: janeSmith,
        title: "Read new book",
        description: 'Chapter 5 of "The Great Gatsby".',
        completed: true,
      },
    ];

    await Todo.insertMany(todos);
    console.log("Todos seeded.");

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    console.log("Destroying all data...");
    await User.deleteMany({});
    await Todo.deleteMany({});
    console.log("All data destroyed!");
    process.exit();
  } catch (error) {
    console.error("Error destroying data:", error);
    process.exit(1);
  }
};

if (process.argv[2] === "--destroy") {
  destroyData();
} else {
  seedData();
}
