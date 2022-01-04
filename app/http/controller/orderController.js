const Order = require('../../models/orders')

const moment=require('moment')
function orderController(){
   return {

   async index(req,res){
        try{
            const orders=await  Order.find({customerId:req.user._id},null,{sort:{'createdAt':-1}});
            console.log(orders);
            res.render('customer/orders',{orders:orders,moment:moment});
        }
        catch(err){

        }
    },
       async store(req,res){
         console.log(req.body);
         if((!req.body.phone_number) || (!req.body.address)){
           req.flash('error','all fields are required');
           return res.redirect('/cart');
         }
         try{
         const order= await new Order({
             customerId:req.user._id,
             items:req.session.cart.items,
             phone:req.body.phone_number,
             address:req.body.address
         })
         await order.save();
         req.flash('success','order placed successfully');
         delete req.session.cart
         res.redirect('/customers/orders')
         }
         catch(err){
             req.flash('error','something went wrong')
             return res.redirect('/cart')
         }
            
       }
   }
}


module.exports=orderController