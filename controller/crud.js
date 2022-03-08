// GET method
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.views", { todoTasks: tasks });
    });
});

app.get("/color", (req, res) => {
    res.render("test.views");
});

// POST method
app.post("/", async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content,
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

// UPDATE method
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("todoEdit.views", { todoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(id, { content: req.body.content }, (err) => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

// DELETE method
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, (err) => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});