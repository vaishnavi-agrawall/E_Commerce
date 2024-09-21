const express=require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router=express.Router();//mini-instance(because we cannot export app from app.js and i want to use app.get, app.use)
const {validateProduct , isLoggedIn, isSeller, isProductAuthor}=require('../middleware');



//to show all the products
router.get('/products',isLoggedIn, async (req,res)=>{
    try{
        let products=await Product.find({});        //all mongoose methods are returning promise thats why we use await and async
        res.render('products/index',{products});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

//to show the form for new product
router.get('/product/new',isLoggedIn,(req,res)=>{
    try{
        res.render('products/new'); //render mai file hit hoti hai
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

//to actually add the product
router.post('/products',validateProduct ,isLoggedIn, isSeller, async(req,res)=>{
    try{
        let {name, img , price , desc}=req.body;
        await Product.create({name, img , price, desc,author:req.user._id});//author req ki body se author nhi aayega vo req.user se aayega
        req.flash('success','Product Added Successfully');
        res.redirect('/products');  //redirect mai url hit hota hai
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

//to show a particular product
router.get('/products/:id' ,isLoggedIn, async(req,res)=>{
    try{
        let {id}=req.params;
        let foundProduct=await Product.findById(id).populate('reviews');    //dono collections(product and review ) aapas mai jud gye hai ab data idhar udhar aa skta hai.
        res.render('products/show',{foundProduct , msg:req.flash('msg')});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

//form to edit the product
router.get('/products/:id/edit',isLoggedIn,async (req,res)=>{
    try{
        let {id}=req.params;
    let foundProduct=await Product.findById(id);
    res.render('products/edit',{foundProduct});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

//to actually edit the data in DB.
router.patch('/products/:id',validateProduct, isLoggedIn,async(req,res)=>{
    try{
        let {id}=req.params;
        let {name, img , price, desc}=req.body;
        await Product.findByIdAndUpdate( id, {name, img , price, desc});
        req.flash('success','Product Edited Successfully');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

//to delete a product
router.delete('/products/:id',isLoggedIn, isProductAuthor, async(req,res)=>{
    try{
        let {id}=req.params;
        //const product=await Product.findById(id);

        // for(let id of product.reviews){         //product.reviews --> is a reviews array for particular product.
        //     await Review.findByIdAndDelete(id);     //delete all the reviews regarding to particular product
        // }
        await Product.findByIdAndDelete(id);    //it gives one product
        req.flash('success','Product Deleted Successfully');
        res.redirect('/products'); 
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

module.exports=router;
