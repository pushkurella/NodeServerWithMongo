const express = require('express');
const router = express.Router();
const Model = require('../model/model');
//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try{
       const dataToSave= await data.save();
       res.status(200).json(dataToSave)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const allData = await Model.find();
        res.status(200).json(allData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
   try{
    const updatedData = req.body;
    const dataUpdated = await Model.findByIdAndUpdate(req.params.id, updatedData, {new:true})
    res.status(200).json(dataUpdated);
}
   catch(error){
     res.status(500).json({message: error.message})
   }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
     try{
    const dataDeleted = await Model.findByIdAndDelete(req.params.id)
    res.status(200).json(dataDeleted);
}
   catch(error){
     res.status(500).json({message: error.message})
   }
})

module.exports = router;