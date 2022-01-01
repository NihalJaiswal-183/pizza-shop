
const cookieParser = require('cookie-parser');
const menu = require('../../models/menu')
function homeController() {
  return {
    index: async function (req, res) {
      try {
        let pizza = await menu.find();
        res.render('home', { pizza: pizza });

      }
      catch (err) {
        console.log('error in fetching the data from backend');
      }


    }
  }
}

module.exports = homeController