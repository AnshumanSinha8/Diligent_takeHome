const taskQueue = require('../src/taskQueue')

// test the addTask Method
test('addTask should add a task to the queue', () => {
  const queue = new taskQueue();
  queue.addTask('deliverPPE');
  const queueItems = queue.getQueue();

  expect(queueItems).toContain('deliverPPE');
});
// test addTask method for multiple tasks
test('addTask should add multiple tasks to the queue', () => {
  const queue = new taskQueue();
  queue.addTask('deliverPPE');
  queue.addTask('deliverPatientSupplies');
  queue.addTask('fetchItem');
  const queueItems = queue.getQueue();

  expect(queueItems).toContain('deliverPPE');
  expect(queueItems).toContain('deliverPatientSupplies');
  expect(queueItems).toContain('fetchItem');
});
// test addTask method on a improper or null task:
test('addTask should not add an unidentifiable task to the queue', () => {
  const queue = new taskQueue();
  queue.addTask('deliverPPE');
  queue.addTask('nonexistentTask');
  const queueItems = queue.getQueue();

  expect(queueItems).not.toContain('nonexistentTask');
});
// test addTask will organize by priority and by time:
test('addTask add multiple tasks in random order and sort them based on priority and time', () => {
  const queue = new taskQueue();
  queue.addTask("deliverPerscriptions");
  queue.addTask("deliverPPE");
  queue.addTask("fetchItem");
  queue.addTask("deliverPerscriptions");
  queue.addTask("nonexistentTask");
  queue.addTask("deliverPatientSupplies");
  queue.addTask("deliverMail");
  queue.addTask("deliverPharmacy");
  queue.addTask("deliverLabTissue");
  queue.addTask("deliverBoneTissue");

  const queueItems = queue.getQueue();

  expect(queueItems).toEqual(['deliverBoneTissue', 'deliverLabTissue', 'deliverPatientSupplies', 'fetchItem', 'deliverPPE', 'deliverPharmacy', 'deliverPerscriptions', 'deliverPerscriptions', 'deliverMail']);
});
// test the getQueue method
test('getQueue should return the full array of task names in the queue', () => {
  const queue = new taskQueue();
  queue.addTask('deliverPPE');
  queue.addTask('deliverPatientSupplies');
  queue.addTask('fetchItem');
  const queueItems = queue.getQueue();

  expect(queueItems).toEqual(['deliverPatientSupplies', 'fetchItem', 'deliverPPE']);
});


// test the removeTask method
test('removeTask should remove a specific task from anywhere in the queue', () => {
  const queue = new taskQueue();
  queue.addTask('deliverPPE');
  queue.addTask('deliverPatientSupplies');
  queue.addTask('fetchItem');
  queue.removeTask('deliverPatientSupplies'); 

  const queueItems = queue.getQueue();
  expect(queueItems).not.toContain('deliverPatientSupplies');
  expect(queueItems).toContain('deliverPPE');
});