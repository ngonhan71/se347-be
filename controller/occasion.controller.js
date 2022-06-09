const Occasion = require('../model/occasion.model')
const Flower = require('../model/flower.model')

const occasionController = {
    getAll: async(req, res) => {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1
            const limit = req.query.limit ? parseInt(req.query.limit) : 5
            const sortByDate = req.query.sortByDate

            let sort = {}
            if (sortByDate) sort.createdAt = sortByDate === "asc" ? 1 : -1
            const skip = (page - 1) * limit

            const data = await Occasion.find({}).skip(skip).limit(limit).sort(sort)
            const count = await Occasion.countDocuments({})
            const totalPage = Math.ceil(count / limit)
            res.status(200).json({
                message: 'success',
                error: 0,
                count,
                data,
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
            const data = await Occasion.findById(id)
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
    getBySlug: async(req, res) => {
        try {
            const { slug } = req.params
            const data = await Occasion.findOne({slug})
            if (data) {
                res.status(200).json({
                    message: 'success',
                    error: 0,
                    data,
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
            const { name } = req.body
            const newOccasion = new Occasion({name})
            const result = await newOccasion.save()
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
            const { name } = req.body
            const { id } = req.params
            const result = await Occasion.findByIdAndUpdate(id, {
                name: name
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
            await Flower.updateMany({occasion: id }, { occasion: null})
            const result = await Occasion.findByIdAndDelete(id)
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

module.exports = occasionController
