import mongoose from "mongoose";

const dietStoreSchema = new mongoose.Schema({
coachId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'coaches', 
      },
userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users', 
      },
providedMeal1:{
    type:String,
    require:true,
},
providedMeal2:{
    type:String,
    require:true,
},
providedMeal3:{
    type:String,
    require:true,
},
water:{
    type:String,
    require:true,
},
Calories:{
    type:String,
    require:true,
},
Steps:{
    type:String,
    require:true,
},
Protein:{
    type:String,
    require:true,
},
Carbohydrates:{
    type:String,
    require:true,
},
Fats:{
    type:String,
    require:true,
},
Fiber:{
    type:String,
    require:true,
},
SleepTime:{
    type:String,
    require:true,
},
Date: {
    type: Date,
    default: Date.now,
  },
})
const dietStoreModel = mongoose.model("DietStore",dietStoreSchema)
export default dietStoreModel;