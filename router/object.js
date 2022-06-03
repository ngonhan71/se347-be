const express = require('express')
const router = express.Router()

const objectController = require('../controller/object.controller')


router.get('/', objectController.getAll)
router.get('/:id', objectController.getById)
router.post('/', objectController.create)
router.put('/:id', objectController.updateById)
router.delete('/:id', objectController.deleteById)


module.exports = router;
