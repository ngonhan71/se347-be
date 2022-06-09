const express = require('express')
const router = express.Router()

const occasionController = require('../controller/occasion.controller')


router.get('/', occasionController.getAll)
router.get('/:id', occasionController.getById)
router.get('/slug/:slug', occasionController.getBySlug)
router.post('/', occasionController.create)
router.put('/:id', occasionController.updateById)
router.delete('/:id', occasionController.deleteById)


module.exports = router;
