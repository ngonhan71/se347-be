
const flowertypeRouter = require('./flowertype.js')
const occasionRouter = require('./occasion')
const objectRouter = require('./object')
const flowerRouter = require('./flower')
const userRouter = require('./user')
const authRouter = require('./auth')


function routes(app) {
    
    app.use('/api/v1/flowertypes', flowertypeRouter)
    app.use('/api/v1/occasions', occasionRouter)
    app.use('/api/v1/objects', objectRouter)
    app.use('/api/v1/flowers', flowerRouter)
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/auth', authRouter)


    app.use('*', function(req, res) {
        res.status(404).json({
            error: 404,
            message: 'Not Found'
        })
    })
   
}

module.exports = routes