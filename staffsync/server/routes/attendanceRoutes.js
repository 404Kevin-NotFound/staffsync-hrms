const router = require('express').Router();
const Attendance = require('../models/Attendance');
const { protect, allowRoles } = require('../middleware/auth');
router.use(protect);
const today = () => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
router.get('/', async(req,res,next)=>{try{const filter=['HR','Manager'].includes(req.user.role)?{}:{user:req.user._id};res.json(await Attendance.find(filter).populate('user','name email').sort({date:-1}));}catch(e){next(e);}});
router.post('/check-in', async(req,res,next)=>{try{let row=await Attendance.findOne({user:req.user._id,date:today()});if(row?.checkIn)return res.status(409).json({message:'You have already checked in today'});if(!row)row=new Attendance({user:req.user._id,date:today(),status:'Present'});row.checkIn=new Date();await row.save();res.status(201).json(row);}catch(e){next(e);}});
router.post('/check-out', async(req,res,next)=>{try{const row=await Attendance.findOne({user:req.user._id,date:today()});if(!row||!row.checkIn)return res.status(400).json({message:'Please check in first'});if(row.checkOut)return res.status(409).json({message:'You have already checked out today'});row.checkOut=new Date();await row.save();res.json(row);}catch(e){next(e);}});
module.exports=router;
