const validator = require("validator");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        description: {
            
            type:String,
            required:true

        },
        allocated:{
            type:Boolean,
            default:false
        } ,
        assetId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'asset',
            default:null
        },
       workerId:{
           type:mongoose.Schema.Types.ObjectId,
           ref:'worker',
           default:null
       },
       frequency:{
        type:String,
        validate(value) {
            const possibleValues = [
                "hourly",
                "daily",
                "weekly",
                "monthly",
                "yearly",
            ];
            if (!possibleValues.includes(value)) {
                throw new Error("Invalid frequency");
            }
        }
       },
       allocationTime:{
           type:Date,
           default:null
       },
       deadline:{
           type:Date,
           default:null
       }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.taskId = _id;
      return object;
    });
  
    const Task = mongoose.model("task", schema);
    return Task;
  };