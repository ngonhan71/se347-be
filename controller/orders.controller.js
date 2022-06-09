const Order = require('../model/orders.model')

const orderController = {
    getAll: async(req, res) => {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1
            const limit = req.query.limit ? parseInt(req.query.limit) : 2
            const sortByDate = req.query.sortByDate
            const skip = (page - 1) * limit
            
            let sort = {}
            if (sortByDate) sort.createdAt = sortByDate === "asc" ? 1 : -1
            const data = await Order.find({}).skip(skip).limit(limit).sort(sort)

            const count = await Order.countDocuments({})
            const totalPage = Math.ceil(count / limit)

            res.status(200).json({
                message: 'success',
                error: 0,
                data,
                count,
                pagination: {
                    page,
                    limit,
                    totalPage,
                }
            })
        } catch (error) {
            res.json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
    getAllByUser: async(req, res) => {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1
            const limit = req.query.limit ? parseInt(req.query.limit) : 2
            const { userId } = req.params
            const skip = (page - 1) * limit

            let query = {}
            if (userId) query.user = { $in : userId}

            const data = await Order.find(query).skip(skip).limit(limit)

            const count = await Order.countDocuments(query)
            const totalPage = Math.ceil(count / limit)

            res.status(200).json({
                message: 'success',
                error: 0,
                data,
                count,
                pagination: {
                    page,
                    limit,
                    totalPage,
                }
            })
        } catch (error) {
            res.json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
    getById: async(req, res) => {
        try {
            const { id } = req.params
            const data = await Order.findById(id).populate("user").populate("products.product")
            if (data) {
                res.status(200).json({
                    message: 'success',
                    error: 0,
                    data
                })
            } else {
                res.status(200).json({
                    message: 'Không tìm thấy đơn hàng!',
                    error: 1,
                    data: {}
                })
            }
        } catch (error) {
            res.json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
    getByIdAndUser: async(req, res) => {
        try {
            const { id, userId } = req.params
            const data = await Order.findOne({_id: id, user: userId})
            .populate("user").populate("products.product")
            if (data) {
                res.status(200).json({
                    message: 'success',
                    error: 0,
                    data
                })
            } else {
                res.status(200).json({
                    message: 'Không tìm thấy đơn hàng!',
                    error: 1,
                    data: {}
                })
            }
        } catch (error) {
            res.json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
    create: async(req, res) => {
        try {
            const now = new Date()
            const orderDate = now.toISOString().slice(0, 10)
            const { userId, email, address, fullName, phoneNumber, cost, cart, 
                receiverInfo, receivingDate } = req.body
            const products = cart.map((product) => {
                return {
                    product: product._id,
                    quantity: product.quantity,
                    price: product.price,
                    totalItem: product.totalPriceItem
                }
            })
            const newOrder = new Order({
                user: userId ? userId : null, 
                email, fullName, address, phoneNumber, cost, products, orderDate,
                receiverInfo, receivingDate
            })
            const result = await newOrder.save()
            res.status(200).json({
                message: 'success',
                error: 0,
                // data: result
            })
        } catch (error) {
            res.status(400).json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
    updateStatusById: async(req, res) => {
        try {
            const { id } = req.params
            const { key, text } = req.body
           
            
            const result = await Order.findByIdAndUpdate(id,  {
                status: { key, text }
            }, {new: true})
            res.status(200).json({
                message: 'success',
                error: 0,
                data: result
            })
        } catch (error) {
            res.status(400).json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
    deleteById: async(req, res) => {
        try {
            const { id } = req.params
            const result = await Order.findByIdAndDelete(id)
            if (result) {
                return res.status(200).json({
                    message: 'success',
                    error: 0,
                    data: result
                })
            } else {
                return res.status(400).json({
                    message: `Không tìm thấy đơn hàng có id: ${id}`,
                    error: 1,
                    data: result
                })
            }
            
        } catch (error) {
            res.status(400).json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
    getRevenueLifeTime: async(req, res) => {
        try {
            const data = await Order.aggregate([
                {
                    $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    revenue: { $sum: "$cost.total" },
                    },
                  },
                  { $sort: { _id: 1 } },
            ])
            res.status(200).json({
                message: 'success',
                error: 0,
                data,
            })
        } catch (error) {
            res.json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
    getCountOrderLifeTime: async(req, res) => {
        try {
            const data = await Order.aggregate([
                {
                    $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    total: { $sum: 1 },
                    },
                  },
                  { $sort: { _id: 1 } },
            ])
            res.status(200).json({
                message: 'success',
                error: 0,
                data,
            })
        } catch (error) {
            res.json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
    getBestSeller: async(req, res) => {
        try {
            const data = await Order.aggregate([
                { $unwind: "$products" },
                {
                    $group: {
                        _id: "$products.product", 
                        count: { $sum: "$products.quantity" }
                    }
                },
                {
                    $lookup: {
                        from: "flowers", 
                        localField: "_id",
                        foreignField: "_id",
                        as: "product",
                    },
                },
                { $sort: { count: -1 } },
                { $limit: 5 },
               
            ])
            res.status(200).json({
                message: 'success',
                error: 0,
                data,
            })
        } catch (error) {
            res.json({
                message: `Có lỗi xảy ra! ${error.message}`,
                error: 1,
            })
        }
    },
}

module.exports = orderController
