const express = require('express')
const router = express.Router()

const flowertypeController = require('../controller/flowertype.controller')


router.get('/', flowertypeController.getAll)
router.get('/:id', flowertypeController.getById)
router.post('/', flowertypeController.create)
router.put('/:id', flowertypeController.updateById)
router.delete('/:id', flowertypeController.deleteById)


module.exports = router;
