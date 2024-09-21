const mongoose=require('mongoose');
const Review = require('./Review');

const productSchema=new mongoose.Schema({       //Schema
    name:{
        type:String,
        trim:true,  //to remove extra white spaces from name
        required:true   //name field is required in the product
    },
    img:{
        type:String,
        trim:true
        //default:  //default image is stored if we didnot gave image to the product
    },
    price:{
        type:Number,
        min:0,  //because any product can't be negative
        required:true
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'//we want to extract object id from reviews.
        }        
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
 
})

//middleware jo behind the scene jo Mongodb operations krwane par use hota 
//hai and iske andr pre and post middleware hote hai which are basically used 
//over the schema and before the model i.e. js class.

productSchema.post('findOneAndDelete' , async function(product){        //jo id bheji hai product routes mai delete wale se usse yha catch krliya hai
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})

let Product=mongoose.model('Product',productSchema);     //model is created with the name of Product

module.exports=Product;