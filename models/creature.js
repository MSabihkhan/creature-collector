const mongoose = require('mongoose');
const creatureSchema = new mongoose.Schema({
name: { type: String, required: true },
power: String,
owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Creature', creatureSchema);