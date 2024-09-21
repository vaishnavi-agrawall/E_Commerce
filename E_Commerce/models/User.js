const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

const userSchema=new mongoose.Schema({       //Schema
    email:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

userSchema.plugin(passportLocalMongoose);
let User=mongoose.model('User',userSchema);     //model is created with the name of User

module.exports=User;