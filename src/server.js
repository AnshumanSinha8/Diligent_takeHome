const express = require('express');
const TaskQueue = require('./taskQueue');

const app = express();
const PORT = 8000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the Task Dispatcher API");
});

// navigate to this url endpoint and refresh to test on live server:
// can view the taskDispatcher functioning in the console.
app.get('/taskQueue', (req, res) => {
    const queue = new TaskQueue();
    queue.startDispatcher();

    queue.addTask("deliverPerscriptions");
    queue.addTask("deliverPPE");
    queue.addTask("fetchItem");

    const queueItems = queue.getQueue();

    res.send(`Task Queue: ${queueItems.join(', ')}`);
});

app.listen(PORT, () => {
    console.log(`Task dispatcher server started on port ${PORT}`);
});
