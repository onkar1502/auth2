const express = require('express');

const app = express();
const connectToDB=require('./config/mongoose');

const authroutes=require('./routes/authroutes');
const cookieParser=require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Connect to MongoDB
connectToDB();

// Set up EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));

// Routes
app.get("/" ,function(req,res){
    res.render("index");
});

app.get("/login",function(req,res){
    res.render("login");
});



app.use('/auth',authroutes);





// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
