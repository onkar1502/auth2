const express=require('express');
const router=express.Router();
const {registeruser,loginuser,logoutuser,profileuser}=require('../controllers/authcontrollers')
const {protect}=require("../middleware/protect.js");

router.post('/register',registeruser);
router.post('/login',loginuser);
router.get('/logout',logoutuser);
router.get('/profile',protect,profileuser);