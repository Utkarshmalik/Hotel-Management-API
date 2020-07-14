module.exports = app => {
    const workers = require("../controllers/worker.controller");
    const tasks = require("../controllers/task.controller");
   const assets = require("../controllers/asset.controller");

  
    var router = require("express").Router();
  
    // Create a new worker
    router.post("/add-worker", workers.create);
  
    // Retrieve all workers
    router.get("/worker/all", workers.findAll);
  
    // // Retrieve all published workers
    // router.get("/published", workers.findAllPublished);
  
    // // Retrieve a single worker with id
    // router.get("/:id", workers.findOne);
  
    // // Update a worker with id
    // router.put("/:id", workers.update);
  
    // // Delete a worker with id
    // router.delete("/:id", workers.delete);
  
    // // Create a new worker
    // router.delete("/", workers.deleteAll);


    //task apis

      // Create a new task
      router.post("/add-task", tasks.create);
  
      // Retrieve all workers
      router.get("/task/all", tasks.findAll);


      //asset apis

        // Create a new worker
    router.post("/add-asset", assets.create);
  
    // Retrieve all workers
    router.get("/asset/all", assets.findAll);


    router.post("/allocate-task",tasks.allocateTask);
    
  
    app.use('/', router);
  };