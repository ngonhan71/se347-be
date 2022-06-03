const Flowertype = require('../model/flowertype.model')
const Flower = require('../model/flower.model')

const flowertypeController = {
    getAll: async(req, res) => {
        try {
            const data = await Flowertype.find({})
            res.status(200).json({
                message: 'success',
                error: 0,
                data
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
            const data = await Flowertype.findById(id)
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
            const newFlowertype = new Flowertype({name})
            const result = await newFlowertype.save()
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
            const result = await Flowertype.findByIdAndUpdate(id, {
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
            await Flower.updateMany({flowertype: id }, { flowertype: null})
            const result = await Flowertype.findByIdAndDelete(id)
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
    }
}

module.exports = flowertypeController
