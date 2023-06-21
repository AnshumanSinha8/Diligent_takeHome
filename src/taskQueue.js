const tasks = require('./tasks');

class TaskQueue {
    constructor() {
        this.queue = [];
        this.dispatcherInterval = null;
    }

    addTask(taskName) {
        const task = tasks.find(item => item.taskName === taskName);
        if (!task) {
            console.log(`Task "${taskName}" not found in the task list.`);
            return;
        }

        const { priority } = task;
        const item = { taskName, priority };
        let added = false;

        for (let i = 0; i < this.queue.length; i++) {
            const existingTask = tasks.find(item => item.taskName === this.queue[i].taskName);

            if (priority > existingTask.priority || (priority === existingTask.priority && task.time < existingTask.time)) {
                this.queue.splice(i, 0, item);
                added = true;
                break;
            }
        }

        if (!added) {
            this.queue.push(item);
        }
    }

    removeTask(taskName) {
        const index = this.queue.findIndex(item => item.taskName === taskName);
        if (index !== -1) {
            const removedTask = this.queue.splice(index, 1)[0];
            return removedTask.taskName;
        }
        return null;
    }

    getQueue() {
        return this.queue.map(item => item.taskName);
    }

    startDispatcher() {
        console.log('Beginning Processes...')
        if (this.dispatcherInterval) {
            return;
        }

        this.dispatcherInterval = setInterval(() => {
            if (this.queue.length > 0) {
                const nextTask = this.queue[0];
                this.executeTask(nextTask)
                    .then(() => {
                        this.queue.shift();
                        if (this.queue.length === 0) console.log('Queue is now empty, awaiting new task(s)')
                    })
                    .catch((error) => {
                        console.error(`Error executing ${nextTask.taskName}: ${error}`);
                    });
            }
        }, 3000);
    }

    stopDispatcher() {
        console.log('Dispatcher Shutting Down!')
        clearInterval(this.dispatcherInterval);
    }

    executeTask(task) {
        return new Promise((resolve, reject) => {
            const taskFunction = tasks.find(item => item.taskName === task.taskName).func;

            setTimeout(() => {
                try {
                    taskFunction();
                    console.log(`${task.taskName} has been successfully completed!`);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, 5000);
        });
    }
}

module.exports = TaskQueue;