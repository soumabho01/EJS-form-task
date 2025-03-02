const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Store tasks in memory (for now, you can later use a database)
let tasks = [];

app.get('/', (req, res) => {
    res.render("index", { tasks });
});

// Handle form submission
app.post('/addTask', (req, res) => {
    const { name, details } = req.body;
    tasks.push({ name, details });
    res.redirect('/');
});

// Render task details when clicking "Read more..."
app.get('/task/:index', (req, res) => {
    const index = req.params.index;
    if (tasks[index]) {
        res.render("task", { task: tasks[index] });
    } else {
        res.send("Task not found");
    }
});

app.listen(3000, () => {    
    console.log('Server is running on port 3000');
});



