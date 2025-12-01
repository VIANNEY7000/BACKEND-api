import mongoose from "mongoose";
const corhortFoureSchema = new mongoose.Schema(
    {
        name:{type:String, required:true},
        email:{type:String, required:true, unique:true},
        phoneNumber:{type:String, required:true, unique:true },
        password:{type:String, required:true,},
        country:{type:String, required:true},
        state:{type:String, required:false}
    },

    {timestamps: true}

)
const corhortFoure = mongoose.model("corhortFoure", corhortFoureSchema)
export default corhortFoure