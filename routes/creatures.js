const express = require('express');
const creaturerouter = express.Router();
const {addCreature,removeCreature,getcreatures} = require('../controller/creatureController')

creaturerouter.get('/',getcreatures)
creaturerouter.post('/',addCreature)
creaturerouter.delete('/:id',removeCreature)

module.exports = creaturerouter