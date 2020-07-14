const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

//add the models to the db here

// db.tutorials = require("./tutorial.model.js")(mongoose);


db.tasks=require("./task.model.js")(mongoose);
db.workers=require("./worker.model.js")(mongoose);
db.assets=require("./asset.model.js")(mongoose);

module.exports = db;