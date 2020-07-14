const db=require('../models');

const Task=db.tasks
const Asset=db.assets
const Worker=db.workers

exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Task
    const task = new Task({
      description: req.body.description,
      frequency: req.body.frequency,
    });
  
    // Save Task in the database
    task
      .save(task)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Task."
        });
      });
  };

// Retrieve all  from the database.
exports.findAll = (req, res) => {
  const description = req.query.description;
  var condition = description ? { name: { $regex: new RegExp(description), $options: "i" } } : {};

  Task.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tasks."
      });
    });
};


exports.findOne = (req, res) => {
  const TaskId = req.params.TaskId;

  Task.findById(TaskId)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Task with id=" + id });
    });
};

exports.allocateTask = (req, res) => {
  
  console.log(req.body);


  const {taskId,assetId,workerId,timeOfAllocation,deadline}=req.body;

  console.log(taskId);
  console.log(assetId);
  console.log(workerId);
  console.log(timeOfAllocation);
  console.log(deadline);

  const filter = { taskId:taskId };
  const update = { allocated:true,workerId:workerId,assetId:assetId};


  Worker.findByIdAndUpdate(workerId,{$push:{tasks:taskId}})
    // Asset.findByIdAndUpdate(assetId,{$push:{tasks:taskId}})
  .then((data)=>Asset.findByIdAndUpdate(assetId,{$push:{tasks:taskId}}))
  .then((data)=> Task.findByIdAndUpdate(taskId, update)
)
  .then(data=>{
    console.log(data);
    res.send(data)})
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error uddating task "});
  })

  console.log("dccd");

  
};

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
  
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
  
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
  
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
  
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
  
// };



