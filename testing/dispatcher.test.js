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
  test('should add a task to the running dispatcher and then execute it fully', (done) => {
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

  // Test adding a nonexistent task to dispatcher
  test('should throw an error when adding a nonexistent task to the dispatcher', () => {
    const nonexistentTask = 'nonexistentTask';
    const errorMessage = `Task "${nonexistentTask}" not found in the task list.`;
      
    // Mock console.log to capture the logged message
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
      
    queue.addTask(nonexistentTask);
      
    expect(consoleLogMock).toHaveBeenCalledWith(errorMessage);
      
    // Restore the original console.log implementation
    consoleLogMock.mockRestore();
    });

//   // Test to check if adding a task to empty queue will execute task. I.e, is the task dispatcher capable of continuity?
//   test('should add a task to the dispatcher once the previous queue has been fully emptied', (done) =>{
//     queue.startDispatcher();
//     queue.addTask('deliverPPE');

//     expect(queue.getQueue()).toContain('deliverPPE');
//     // Now that dispatcher is started and deliverPPE has been added to the queue, assume task is being executed automatically so just check that the queue is empty.
//     setTimeout(() => {
//         const queueItems = queue.getQueue();
//         expect(queueItems).not.toContain('deliverPPE');
  
//         // Once queue has been confirmed to be empty, need to add a task to the queue again to see if it successfully adds to the queue once you hit the case that the previous queue has been emptied.
//         queue.addTask('fetchItem');
//         expect(queue.getQueue()).toEqual(['fetchItem']);
//         done();
//       }, 2000);
//     });
});