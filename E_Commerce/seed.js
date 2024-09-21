const mongoose=require('mongoose');

const Product=require('./models/Product');



const products=[
    {
        name:'Iphone 14 pro',
        img:"https://images.unsplash.com/photo-1664478711535-fd3cc5d1a99a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGlwaG9uZSUyMDE0JTIwcHJvfGVufDB8fDB8fHww",
        price:130000,
        desc:"Very costly,aukaat ke bahar"
    },
    {
        name:'Macbook m2 pro',
        img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
        price:250000,
        desc:"ye to bilkul hi aukaat ke bahar hai"
    },
    {
        name:'IWatch',
        img:"https://images.unsplash.com/photo-1558126319-c9feecbf57ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SXdhdGNofGVufDB8fDB8fHww",
        price:51000,
        desc:"ye sasta hai lelo"
    },
    {
        name:'IPad pro',
        img:"https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D",
        price:237900,
        desc:"life mai kuch cheez sirf dekhne ke liye hota hai"
    },
    {
        name:'airpods',
        img:"https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFpcnBvZHN8ZW58MHx8MHx8fDA%3D",
        price:2500,
        desc:"ye kuch sasta sa hai"
    }
]

async function seedDB(){   
    //jab tum database ke saath operation krte hai(.insertMany([])) to ye saare ye ek promise return krte hai promise ki chaining se bachne ke liye hmm async and await krte hai. async and await vha krte hai jis kaam ka hmme conclusion ka wait krna ho.(database ke saath kaam krna ho)
    //await Product.deleteMany({});         
    await Product.insertMany(products);
    console.log("Data Seeded Successfully");
}

module.exports=seedDB;
