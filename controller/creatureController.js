const Creature = require('../models/creature')
const jwt = require('jsonwebtoken')
exports.getcreatures = async(req , res)=>{
    try{
    const token = req.cookies.token
    if(!token) return res.status(401).json({error: 'Not logged in'})
    const decoded = jwt.verify(token, 'secret')
    const userId = decoded.userId
    const CREATURES = await Creature.find({owner:userId})
    if(CREATURES.length ==0){
        return res.status(200).json(CREATURES)
    }
    else{
        return res.status(200).json(CREATURES)
    }
    }
catch(err){
    return res.status(400).json(err.message)
}
}

exports.addCreature = async(req,res)=>{
    try{
    const token = req.cookies.token
    if(!token) return res.status(401).json({error: 'Not logged in'})
    const decoded = jwt.verify(token, 'secret')
    const userId = decoded.userId
    const NEWCREATURE = await Creature.create({name : req.body.name ,
                                        power: req.body.power,
                                        owner: userId})
    return res.status(201).json(NEWCREATURE  t)
    }
    catch(err){
    return res.status(400).json(err.message)
}
}



exports.removeCreature = async(req,res)=>{
    try{
    const token = req.cookies.token
    if(!token) return res.status(401).json({error: 'Not logged in'})
    const decoded = jwt.verify(token, 'secret')
    const userId = decoded.userId
    const CreatureID = req.params.id
    
    const DELETED_CREATURE = await Creature.findOneAndDelete({_id: CreatureID , owner:userId})
    if (!DELETED_CREATURE){
        return res.status(404).json({'message':'Creature not found'})
    }
    else{
        return res.status(200).json({'message':'Creature deleted successfully'})
    }
    
    }
    catch(err){
    return res.status(400).json(err.message)
}
}