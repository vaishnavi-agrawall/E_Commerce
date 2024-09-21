const express=require('express');
const app=express();//we cannot module.export app because it is our instance of our application. There is only one instance for an application
const path=require('path');
const mongoose = require('mongoose');
const seedDB=require('./seed');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');
const flash=require('connect-flash');
const session=require('express-session');

const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/User');

const productRoutes=require('./routes/product');
const reviewRoutes=require('./routes/review');
const authRoutes=require('./routes/auth');
const cartRoutes=require('./routes/cart');



mongoose.connect('mongodb://127.0.0.1:27017/shopping-kush-app')
.then(()=>{
    console.log('DB Connected Successfully');
})
.catch((err)=>{
    console.log('DB not Connected');
    console.log(err);
})


//session
let configSession={
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly :true,
    expires: Date.now()+7*24*60*60*1000,
    maxAge: 7*24*60*60*1000
  }
}

app.engine('ejs', ejsMate); //ejs ki file dekhni hai to vo kaunsa engine dekh rha hai(ejs-mate).
app.set('view engine','ejs');   // we set our view engine to see only ejs files. 
app.set('views',path.join(__dirname,'views'));//views folder
app.use(express.static(path.join(__dirname,'public'))); //public folder
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.use(session(configSession));
app.use(flash());
//passport waali
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})



//passport
passport.use(new LocalStrategy(User.authenticate()));


// seeding database
// seedDB();
app.use(productRoutes);//so that har incoming request ke liye path check kiya jaye
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);



app.listen(8080,()=>{
    console.log('Server connected at port 8080');
})