const TaskQueue = require('../src/taskQueue');

describe('Dispatcher Testing Suite', () => {
  let queue;
  beforeEach(() => {
    queue = new TaskQueue();
  });

  // Test starting and stopping the dispatcher
  test('startDispatcher should start and stopDispatcher should stop the dispatcher', () => {
    queue.startDispatcher();
    expect(queue.dispatcherInterval).not.toBeNull();

    queue.stopDispatcher();
    expect(queue.dispatcherInterval).toBeNull();
    });

  // Test adding a task to a running dispatcher
  test('should add a task to the running dispatcher', (done) => {
    queue.startDispatcher();
    queue.addTask('deliverPPE');

    // Delay assertion to allow taskexecution
    setTimeout(() => {
      const queueItems = queue.getQueue();
      expect(queueItems).not.toContain('deliverPPE');

      queue.stopDispatcher();
      done();
    }, 2000); // Adjust delay as needed based on the task execution time
  });
});
