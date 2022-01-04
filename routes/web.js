const homeController=require('../app/http/controller/homeController')
const authController=require('../app/http/controller/authController')
const cartController=require('../app/http/controller/customers/cartController')
const guest=require('../app/http/middleware/guest')
const auth=require('../app/http/middleware/auth')
const admin=require('../app/http/middleware/admin')
const orderController=require('../app/http/controller/orderController')
const adminOrderController=require('../app/http/controller/admin/orderController')
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
    app.post("/orders",orderController().store)
    app.get('/customers/orders',auth,orderController().index)
   
    // admin routes
    app.get('/admin/orders',admin,adminOrderController().index)
}


module.exports = initRoutes