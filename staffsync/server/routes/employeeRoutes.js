const router = require('express').Router();
const Employee = require('../models/Employee');
const { protect, allowRoles } = require('../middleware/auth');
router.use(protect, allowRoles('HR'));
router.get('/', async (req,res,next) => { try { res.json(await Employee.find().sort({ createdAt: -1 })); } catch(e){next(e);} });
router.post('/', async (req,res,next) => { try { const employee = await Employee.create(req.body); res.status(201).json(employee); } catch(e){next(e);} });
router.put('/:id', async (req,res,next) => { try { const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true}); if(!employee) return res.status(404).json({message:'Employee not found'}); res.json(employee); } catch(e){next(e);} });
router.delete('/:id', async (req,res,next) => { try { const employee = await Employee.findByIdAndDelete(req.params.id); if(!employee) return res.status(404).json({message:'Employee not found'}); res.json({message:'Employee deleted'}); } catch(e){next(e);} });
module.exports = router;
