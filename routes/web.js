const homeController=require('../app/http/controller/homeController')
const authController=require('../app/http/controller/authController')
const cartController=require('../app/http/controller/customer/cartController')
const guest=require('../app/http/middleware/guest')
const auth=require('../app/http/middleware/auth')
const admin=require('../app/http/middleware/admin')
const orderController=require('../app/http/controller/orderController')
const adminOrderController=require('../app/http/controller/admin/orderController')
const statusController = require('../app/http/controller/admin/statusController')

let cors = require("cors");

const corsOptions = {origin : "http://localhost:3000/" }; 
function initRoutes(app) {
    app.get("/", homeController().index)
    app.get("/cart",cartController().index)
    app.get("/login", guest,authController().login)
    app.post("/login", authController().postLogin)
    app.get("/register",guest,authController().register)
    app.post("/updateCart",cartController().update)
    app.post("/register",authController().postRegister)
    app.get("/logout",authController().logout)
    //customer routes
    app.post("/orders",cors(corsOptions),orderController().store)
    app.get('/customers/orders',auth,orderController().index)
    app.get('/customers/orders/:id',auth,adminOrderController().show)
   
    // admin routes
    app.get('/admin/orders',admin,adminOrderController().index)
    app.post('/admin/order/status',admin,statusController().update)
    
}


module.exports = initRoutes