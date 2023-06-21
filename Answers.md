## 1: What components may be required to accomplish this on a high level? (think in terms of storage, background tasks, etc.)
- Components Needed:
    1. Task Management Service: A service to manage tasks requested by clients and determine the appropriate backend functions to execute. Essentially we need a way to manage various tasks from various clients for various robots with various conditions.
    2. Task Queue: A layer to store additional tasks when the robot is occupied, ensuring uninterrupted execution. This is a primary functionality of the service. 
    3. Data Storage: A database to track requested and completed tasks, along with relevant information such as task details, priority levels, and client authorization. This will also be useful for other means, we could create adatabase to help track error handling, completion statuses, and optimized pathways/constraint metrics.
    4. Caching Layer: A caching system to optimize frequently requested data and reduce server load. Caching things like the most commonly requested tasks, details, and authorized clients would likely be worth the memory space.
    5. Testing Layer: An automated testing framework to ensure the reliability and functionality of the system. A necessity in a healthcare setting, especially for a frequently tasked system. 


- Additional Thoughts:
    1. External APIs? - When a robot completes a task that requires it to deliver or retrieve an item, do we need to interact with a 3rd party API (the hospital's own private database?) so that this 3rd party record shows that our robot has retrieved and/or delivered the item?
        • Additionally, we need to be able to interact with 3rd party APIs before even executing specific task functions because what if a task is requested and halfway through the task Moxi learns that there are no syringes/supplies or whatever it needs to retrieve?
    2. How do we make sure that only secure clients can ask it to do tasks? How do we verify that whomoever at the terminal has the authority/verification to request a specific high-priority task from Moxi.
        • Do we need to interact with the hospital's APIs each time they hire/lose staff at the authorized persons level so we can make sure to add/remove authentication as appropriate?


## 2: What kind of tooling, frameworks, design patterns, etc would you use for these requirements in a production-setting?
- Tooling:
    1. PostgreSQL for storing relational data; this would be really useful for creating error/completion logs as well as the actual tasks themselves.
    2. MongoDB as a secondary database for storing data for analytics and real-time dashboards. There is a cost to having relational data and rendering dashboards could add some unneccesary time complexity to our SQL queries. If we also create a secondary nonSQL database we can save on the time these queries take to complete and can also build more complex and real-time dashboards. It is important to note that there is a risk to this approach as data discrepancies can creep into a system that has multiple database systems.
- Frameworks:
    1. Node.js and Express to build an asynchronous and non-blocking system. With this framework we can prepare our robot for a future where we need to scale the system to handle multiple tasks at once, or make multiple requests at once that are needed for a single task.
- Design Patterns:
    1. Priority Queue using Apache Kafka to handle task priorities. Could just be a basic Queue data structure and doesn;t need to be an Apache Kafka implementation either. 
    2. Publish-Subscribe pattern for notifying clients about task updates. I believe that the more common MVC also works in this case as I believe it could provide more structure for the user-interface, but the publish-subscribe pattern would allow us to do things like create background listeners, implement the task management system, and introduce loose coupling. These later two concepts are integral to how I envision this system working so using the MVC might make it easier to design a UI, but overall would make it much more complicated to develop this system to function with as little wait times and processing loads as possible.
- Containerization/Orchestration:
    1. Docker and Kubernetes for easier deployment, scalability, and load balancing. This docker containerization would allow us to have more consistent deployments for the robots and kubernetes would help us load-balance requests which would be essential if one of the robots is trying to work on many asynchronous API calls 


- Additional Thoughts:
• Prod vs Dev setting - I'm assuming that we want to increase performance and ensure a more secure authentication system when moving an application from dev to prod, but what other constraints should I be anticipating?
• Could also utilize some monitoring tools when the code is in production! something like Kibana could help track performance/errors/etc...


## 3: Implement/program the process that dispatches tasks while satisfying the order constraints. Don’t worry about the direct communication between robots and this service. Focus on the logic of this service instead. (programming language of your choice, add any unit functions if necessary). For the sake of this exercise, using an in-memory data store is fine, we're looking for the logic mostly.
- Implementation located through the backend src directory and basic unit testing included.

Of course, this is only an applicable answer to a system that has a single robot. If there were multiple robots, we would need to not only build the tasks data schema located in tasks.js, but we would need to be able to identify which robot is being assigned which task, therefore we would also need a robots.js folder, or database schema to isolate this issue.