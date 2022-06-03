const express = require('express')
const router = express.Router()

const userController = require('../controller/users.controller')
const { verifyToken, verifyUser } = require('../middleware/auth')



router.get('/', userController.getAll)
router.get('/:id', verifyToken, verifyUser, userController.getById)
router.put('/:id', verifyToken, verifyUser, userController.updateProfileById)
router.delete('/:id', verifyToken, verifyUser, userController.deleteById)




module.exports = router;
