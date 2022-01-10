const Order = require('../../models/orders')
const stripe = require('stripe')('sk_test_51KFeu3SCatt0pJoftSo1raZ0aZPY6hHZ0NvfyZn7rg7FbCHgNxF1Uaqklbr7DOyYFvFqXC9haNxWjEbQyh7ckrCa00l6dr0RHq')
const moment=require('moment')
const YOUR_DOMAIN = "http://localhost:3000";
function orderController(){
   return {

   async index(req,res){
        try{
            const orders=await  Order.find({customerId:req.user._id},null,{sort:{'createdAt':-1}});
            
            res.render('customers/orders',{orders:orders,moment:moment});
        }
        catch(err){

        }
    },
 store(req, res) {
      // Validate request
      const { phone_number, address, stripeToken, paymentType } = req.body
      
      if(!phone_number || !address) {
          return res.status(422).json({ message : 'All fields are required' });
      }

      const order = new Order({
          customerId: req.user._id,
          items: req.session.cart.items,
          phone:phone_number,
          address
      })

      order.save().then(result => {
          Order.populate(result, { path: 'customerId' },async (err, placedOrder) => {
              // req.flash('success', 'Order placed successfully')

              // Stripe payment
              if(paymentType === 'card') {
             
           
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: [
                        {
                            price_data: {
                                currency: "inr",
                                product_data: {
                                    name: 'pizza-shop',
                                    
                                },
                                unit_amount: req.session.cart.totalPrice * 100,
                            },
                            quantity: 1,
                        },
                    ],
                    mode: "payment",
                    success_url: `${YOUR_DOMAIN}/customers/orders`,
                    cancel_url: `${YOUR_DOMAIN}`,
                });
                delete req.session.cart
                placedOrder.paymentStatus = true
                            placedOrder.paymentType = paymentType
                            placedOrder.save().then((ord) => {
                                // Emit
                                const eventEmitter = req.app.get('eventEmitter')
                                eventEmitter.emit('orderPlaced', ord)
                            })
                return res.json({ id: session.id });

              } else {
                  delete req.session.cart
           
                  return res.json({ message : 'Order placed succesfully' });
              }
          })
      }).catch(err => {
   
          return res.status(500).json({ message : 'Something went wrong' });
      })
  },
   
   }
}


module.exports=orderController