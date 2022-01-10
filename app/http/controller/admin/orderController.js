const Order = require('../../../models/orders')
function orderController(){
    return{
    index(req,res){
      // console.log(Order);
       Order.find({status:{$ne:'completed'}},null,{sort:{'createdAt':-1}}).
       populate('customerId','-password').exec((err,order)=>{
         if(req.xhr){
           return res.json(order)
         }
    return res.render('admin/order')
       })
    },
    async  show(req,res){
      const order= await Order.findById(req.params.id);
        //authorize user
        if(req.user._id.toString()===order.customerId.toString()){
          return res.render('customers/singleOrders',{order})
        }
        return res.redirect('/')
    }
    }
}

module.exports = orderController;