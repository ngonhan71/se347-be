const express = require('express')
const router = express.Router()

const orderController = require('../controller/orders.controller')


router.get('/', orderController.getAll)
router.get('/chart/revenue/lifetime', orderController.getRevenueLifeTime)
router.get('/chart/countorder/lifetime', orderController.getCountOrderLifeTime)
router.get('/chart/product/bestseller', orderController.getBestSeller)
router.get('/user/:userId', orderController.getAllByUser)
router.get('/:id', orderController.getById)
router.get('/:id/user/:userId', orderController.getByIdAndUser)
router.post('/', orderController.create)
router.put('/:id/status', orderController.updateStatusById)
router.delete('/:id', orderController.deleteById)



module.exports = router;
