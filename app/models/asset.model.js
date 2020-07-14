module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        assetName: {
        
          type:String,
          required:true
        },
       tasks:[{
           type:mongoose.Schema.Types.ObjectId,
           ref:'task'
       }]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.assetId = _id;
      return object;
    });
  
    const Asset = mongoose.model("asset", schema);
    return Asset;
  };