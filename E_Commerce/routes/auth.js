const express=require('express');
const User = require('../models/User');
const passport = require('passport');
const router=express.Router();//mini-instance(because we cannot export app from app.js and i want to use app.get, app.use)

//to show the form of signup
router.get('/register', (req,res)=>{
    res.render('auth/signup');
})

//actually want to register a user in my db
router.post('/register',async(req,res)=>{
    try{
        let {email, password , username,role}=req.body;
        const user=new User({email,username,role});
        const newUser=await User.register(user, password);
        //res.render('auth/login')
        req.login(newUser , function(err){
            if(err){return next(err)}
            req.flash('success','welcome you are registered successfully');
            return res.redirect('/products');
        })
    }
    catch(e){
        req.flash('error', e.message);
        return res.redirect('/register');
    }

    
})

//to get login form
router.get('/login', (req,res)=>{
    res.render('auth/login');
})

//to actually login by db
router.post('/login',
    passport.authenticate('local',{
        failureRedirect:'/login',
        failureMessage:true
    }),

    (req,res)=>{
        //console.log(req.user,"kush");
        req.flash('success','welcome back');
        res.redirect('/products');
})

//logout

router.get('/logout',(req,res)=>{
    ()=>{
        req.logout();   //req.logout() always works inside the call back function
    }
    req.flash('success', 'goodbye friends, see you again')
    res.redirect('/login');
})




module.exports=router;
