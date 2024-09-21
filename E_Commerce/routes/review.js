const express=require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router=express.Router();//mini-instance(because we cannot export app from app.js and i want to use app.get, app.use)
const {validateReview}=require('../middleware');




//to add a review and  redirect it.
router.post('/products/:id/review', validateReview , async (req,res)=>{
   try{
        let  {id}=req.params;
        let{rating,comment}=req.body;
        // res.send("review route");
        const product=await Product.findById(id);
        const review=new Review({rating, comment});
        product.reviews.push(review);
        await review.save();
        await product.save();
        req.flash('success','Review Added Successfully');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
    
})

// delete particular review
router.delete('/products/:id/review/:review_id',async(req,res)=>{
    let {id,review_id} =req.params;
    await Review.findByIdAndDelete(review_id);
    res.redirect(`/products/${id}`);
})


module.exports=router;
