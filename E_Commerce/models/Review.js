const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({       //Schema
    rating:{
        type:Number,
        min:0,
        max:5
    },
    comment:{
        type:String,
        trim:true
    }
} , {timestamps:true});
let Review=mongoose.model('Review',reviewSchema);     //model is created with the name of Product

module.exports=Review;