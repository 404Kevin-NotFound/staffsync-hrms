const router = require('express').Router();
const Leave = require('../models/Leave');
const { protect, allowRoles } = require('../middleware/auth');
router.use(protect);
router.get('/', async (req,res,next) => { try { const filter = ['HR','Manager'].includes(req.user.role) ? {} : {user:req.user._id}; res.json(await Leave.find(filter).populate('user','name email department').sort({createdAt:-1})); } catch(e){next(e);} });
router.post('/', async (req,res,next) => { try { const {startDate,endDate,reason}=req.body; if(!startDate||!endDate||!reason) return res.status(400).json({message:'Start date, end date and reason are required'}); if(new Date(endDate)<new Date(startDate)) return res.status(400).json({message:'End date cannot be before start date'}); res.status(201).json(await Leave.create({user:req.user._id,startDate,endDate,reason})); } catch(e){next(e);} });
router.patch('/:id/review', allowRoles('HR','Manager'), async (req,res,next) => { try { const {status}=req.body; if(!['Approved','Rejected'].includes(status)) return res.status(400).json({message:'Status must be Approved or Rejected'}); const leave=await Leave.findByIdAndUpdate(req.params.id,{status,approverRole:req.user.role,reviewedBy:req.user._id},{new:true}).populate('user','name email'); if(!leave) return res.status(404).json({message:'Leave request not found'}); res.json(leave); } catch(e){next(e);} });
module.exports=router;
