const Flower = require('../model/flower.model')
const { cloudinary, deleteCloudinary } = require('../services/cloudinary')

const flowerController = {
    getAll: async(req, res) => {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1
            const limit = req.query.limit ? parseInt(req.query.limit) : 2
            const sortByPrice = req.query.sortByPrice 
            const sortByDate = req.query.sortByDate
            const skip = (page - 1) * limit
            const { occasion } = req.query

            let query = {}
            if (occasion) query.occasion = { $in : occasion}
            let sort = {}

            if (sortByPrice) sort.price = sortByPrice === "asc" ? 1 : -1
            if (sortByDate) sort.createdAt = sortByDate === "asc" ? 1 : -1

            const data = await Flower.find(query)
            .populate('occasion')
            .populate('object')
            .populate('flowertype')
            .skip(skip).limit(limit).sort(sort)
             
            const count = await Flower.countDocuments(query)
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
    getBySlug: async(req, res) => {
        try {
            const { slug } = req.params
           
            const data = await Flower.findOne({slug})
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
                    message: 'Không tìm thấy hoa!',
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
    searchFlower: async(req, res) => {
        try {
            const { key } = req.query

            const data = await Flower.aggregate([
                {
                    $lookup: {
                        from: "occasions",
                        localField: "occasion",
                        foreignField: "_id",
                        as: "occasion"
                    }
                },
                { 
                    $match: {
                        $or: [
                            { name: { $regex: key, $options:"$i" } }, 
                            { "occasion.name": { $regex: key, $options:"$i" } } 
                        ]
                    }
                }
            ])
      
            if (data) {
                res.status(200).json({
                    message: 'success',
                    error: 0,
                    data
                })
            } else {
                res.status(200).json({
                    message: 'Không tìm thấy sách!',
                    error: 1,
                    data: []
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
            const { name, flowertype, description,
                occasion, object, display, color, price, discount, imageUrl, publicId } = req.body
            const newFlower = new Flower({name, flowertype, description,
                occasion, object, display, color, price, discount, imageUrl, publicId})
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
            const { name, flowertype, description,
                occasion, object, display, color, price, discount, imageUrl, publicId } = req.body
            const { id } = req.params
            let result = {}
            if (imageUrl && publicId) {
                const flowerUpdate = await Flower.findById(id)
                const publicIdDelete = flowerUpdate.publicId
                if (publicIdDelete) {
                    const resultCloudinary = await deleteCloudinary(cloudinary, publicIdDelete)
                    console.log(resultCloudinary)

                }
                result = await Flower.findByIdAndUpdate(id, {
                    name, flowertype, occasion, object, display, color, description,
                    price, discount, imageUrl, publicId
                }, {new: true})
            } else {
                result = await Flower.findByIdAndUpdate(id, {
                    name, flowertype, occasion, object, display, color, description,
                    price, discount
                }, {new: true})
            }
          
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
                const publicIdDelete = result.publicId
                const resultCloudinary = await deleteCloudinary(cloudinary, publicIdDelete)
                console.log(resultCloudinary)
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
