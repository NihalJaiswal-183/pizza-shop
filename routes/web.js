const homeController=require('../app/http/controller/homeController')
const authController=require('../app/http/controller/authController')
const cartController=require('../app/http/controller/customers/cartController')
const guest=require('../app/http/middleware/guest')

function initRoutes(app) {
    app.get("/", homeController().index)
    app.get("/cart",cartController().index)
    app.get("/login", guest,authController().login)
    app.post("/login", authController().postLogin)
    app.get("/register",guest,authController().register)
    app.post("/updateCart",cartController().update)
    app.post("/register",authController().postRegister)
    app.get("/logout",authController().logout)
}


module.exports = initRoutes