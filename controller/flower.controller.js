const Flower = require('../model/flower.model')


const flowerController = {
    getAll: async(req, res) => {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1
            const limit = req.query.limit ? parseInt(req.query.limit) : 10
            const skip = (page - 1) * limit
            // let query = {}
            // if (req.query.author) {
            //     query.author = { $in: req.query.author }
            // }

            const data = await Flower.find({})
            .populate('occasion')
            .populate('object')
            .populate('flowertype')
            .skip(skip).limit(limit)
             
            const count = await Flower.countDocuments({})
            const totalPage = Math.ceil(count / limit)
            res.status(200).json({
                message: 'success',
                error: 0,
                count,
                totalPage,
                data,
                pagination: {
                    page,
                    limit
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
           
            const data = await Flower.findById(id)
            .populate('occasion')
            .populate('object')
            .populate('flowertype')
            if (data) {
                res.status(200).json({
                    message: 'success',
                    error: 0,
                    data
                })
            } else {
                res.status(200).json({
                    message: 'Không tìm thấy!',
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
            const { name, flowertype, 
                occasion, object, display, color, price, discount, imageUrl } = req.body
            const newFlower = new Flower({name, flowertype, 
                occasion, object, display, color, price, discount, imageUrl})
            const result = await newFlower.save()
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
    updateById: async(req, res) => {
        try {
            const { name, flowertype, 
                occasion, object, display, color, price, discount, imageUrl } = req.body
            const { id } = req.params
            const result = await Flower.findByIdAndUpdate(id, {
                name, flowertype, occasion, object, display, color, price, discount, imageUrl
            }, {new: true})
            if (result) {
                return res.status(200).json({
                    message: 'success',
                    error: 0,
                    data: result
                })
            } else {
                return res.status(400).json({
                    message: `Không tìm thấy!`,
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
    deleteById: async(req, res) => {
        try {
            const { id } = req.params
            const result = await Flower.findByIdAndDelete(id)
            if (result) {
                return res.status(200).json({
                    message: 'success',
                    error: 0,
                    data: result
                })
            } else {
                return res.status(400).json({
                    message: `Không tìm thấy`,
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
    }
}

module.exports = flowerController
