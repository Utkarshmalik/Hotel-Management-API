module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name:{

          type:String,
          required:true
        },

        skill:{

          type:String
        },
        tasks:[{type:mongoose.Schema.Types.ObjectId,ref:"task"} ]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.workerId = _id;
      return object;
    });
  
    const Worker = mongoose.model("worker", schema);
    return Worker;
  };