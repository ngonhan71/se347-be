const User = require('../model/users.model')

const usersController = {
    getAll: async(req, res) => {
        try {
            // const page = req.query.page ? parseInt(req.query.page) : 1
            // const limit = req.query.limit ? parseInt(req.query.limit) : 2
            // const skip = (page - 1) * limit
            const data = await User.find({})
            const count = await User.countDocuments({})
            // const totalPage = Math.ceil(count / limit)
            res.status(200).json({
                message: 'success',
                error: 0,
                count,
                // totalPage,
                data,
                // pagination: {
                //     page,
                //     limit
                // }
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
            const data = await User.findById(id)
            if (data) {
                return res.status(200).json({
                    message: 'success',
                    error: 0,
                    data
                    
                })
            } else {
                return res.status(200).json({
                    message: 'Không tìm thấy user!',
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
    // create: async(req, res) => {
    //     try {
    //         const { name, year } = req.body
    //         const newAuthor = new Author({name, year})
    //         const result = await newAuthor.save()
    //         res.status(200).json({
    //             message: 'success',
    //             error: 0,
    //             data: result
    //         })
    //     } catch (error) {
    //         res.status(400).json({
    //             message: `Có lỗi xảy ra! ${error.message}`,
    //             error: 1,
    //         })
    //     }
    // },
    updateProfileById: async(req, res) => {
        try {
            const { fullName, phoneNumber, address } = req.body
            const { id } = req.params
            const result = await User.findByIdAndUpdate(id, {
                fullName, phoneNumber, address
            }, {new: true})
            if (result) {
                return res.status(200).json({
                    message: 'success',
                    error: 0,
                    data: result
                })
            } else {
                return res.status(400).json({
                    message: `Không tìm thấy user có id:${id}`,
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
            const result = await User.findByIdAndDelete(id)
            if (result) {
                return res.status(200).json({
                    message: 'success',
                    error: 0,
                    data: result
                })
            } else {
                return res.status(400).json({
                    message: `Không tìm thấy user có id:${id}`,
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

module.exports = usersController
