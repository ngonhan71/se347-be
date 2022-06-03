const express = require('express')
const router = express.Router()

const flowerController = require('../controller/flower.controller')


router.get('/', flowerController.getAll)
router.get('/:id', flowerController.getById)
router.post('/', flowerController.create)
router.put('/:id', flowerController.updateById)
router.delete('/:id', flowerController.deleteById)


module.exports = router;
