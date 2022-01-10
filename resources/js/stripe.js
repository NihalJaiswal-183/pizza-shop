// import { loadStripe } from '@stripe/stripe-js'
import { placeOrder } from './apiService'
import { CardWidget } from './CardWidget'
import axios from 'axios'
import Noty from 'noty'
export async function initStripe() {
    var stripe = Stripe('pk_test_51KFeu3SCatt0pJofslV3eAf0fZE4kKqbOeparrX6Wx5dA5gTUyQkc5hLRWTtnYAvrh3j6f92vt7JzvxDOubRjM0T00Dt6LMwph');
//    const stripe = await loadStripe('pk_test_51KFeu3SCatt0pJofslV3eAf0fZE4kKqbOeparrX6Wx5dA5gTUyQkc5hLRWTtnYAvrh3j6f92vt7JzvxDOubRjM0T00Dt6LMwph');
   let card = null;
   console.log("nihal");

   const paymentType = document.querySelector('#paymentType');
   if(!paymentType) {
       return;
   }
   paymentType.addEventListener('change' , (e)=> {

       if(e.target.value === 'card') {
           // Display Widget
          card = new CardWidget(stripe)
          card.mount()
       } else {
           card.destroy()
       }

   })


   // Ajax call
const paymentForm = document.querySelector('#payment-form');
if(paymentForm) {
   paymentForm.addEventListener('submit', async (e) => {
       e.preventDefault();
       let formData = new FormData(paymentForm);
       let formObject = {}
       for(let [key, value] of formData.entries()) {
           formObject[key] = value
       }

       if (!card) {
           // Ajax
          
           axios.post('/orders', formObject).then((res) => {
        new Noty({
            type: 'success',
            timeout: 1000,
            text:"success",
            progressBar: false,
        }).show();
        setTimeout(() => {
            window.location.href = '/customers/orders';
        }, 1000);
    }).catch((err)=> {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: err,
            progressBar: false,
        }).show();

    })
           return;
       }

       axios.post('/orders', formObject)
       .then(function (session) {
         return stripe.redirectToCheckout({ sessionId: session.data.id });
       })
       .then(function (result) {
         // If redirectToCheckout fails due to a browser or network
         // error, you should display the localized error message to your
         // customer using error.message.
         if (result.error) {
           alert(result.error.message);
         }
       })
       .catch(function (error) {
         console.error("Error:", error);
       });

   })
}
}