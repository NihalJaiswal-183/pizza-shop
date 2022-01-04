const Order = require('../../../models/orders')
function orderController(){
    return{
    index(req,res){
      // console.log(Order);
       Order.find({status:{$ne:'completed'}},null,{sort:{'createdAt':-1}}).
       populate('customerId','-password').exec((err,order)=>{
         if(req.xhr){
          //  order="nihal";
           console.log(order);
           return res.json(order)
         }
    return res.render('admin/order')
       })
    }
    }
}

module.exports = orderController;