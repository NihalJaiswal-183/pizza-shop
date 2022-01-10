function cartController() {
  return {
    index: function (req, res) {
        
      res.render("customers/cart");
    },
    update: function (req, res) {
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      
      if(!req.session.cart.items[req.body._id]){
        req.session.cart.items[req.body._id]={
            item:req.body,
            qty:1
        }
        req.session.cart.totalQty=req.session.cart.totalQty+1;
        req.session.cart.totalPrice=req.session.cart.totalPrice+req.body.price;
      }
      else{
        req.session.cart.items[req.body._id].qty=req.session.cart.items[req.body._id].qty+1;
        req.session.cart.totalQty=req.session.cart.totalQty+1;
        req.session.cart.totalPrice=req.session.cart.totalPrice+req.body.price;
    }
      console.log(req.session.cart);
      return res.json({ totalQty: req.session.cart.totalQty });
    },
  };
}

module.exports = cartController;
