const db=require('../models');

const Asset=db.assets

exports.create = (req, res) => {
    // Validate request
    if (!req.body.assetName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Asset
    const asset = new Asset({
        assetName: req.body.assetName
    });
  
    // Save Asset in the database
    asset
      .save(asset)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Asset."
        });
      });
  };

// Retrieve all  from the database.
exports.findAll = (req, res) => {
  const assetName = req.query.assetName;
  var condition = assetName ? { name: { $regex: new RegExp(assetName), $options: "i" } } : {};

  Asset.find(condition)
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

  Asset.findById(TaskId)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Asset with id=" + id });
    });
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