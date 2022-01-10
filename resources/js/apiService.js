import axios from 'axios'
import Noty from 'noty'

export function placeOrder(formObject) {
    var stripe = Stripe('pk_test_51KFeu3SCatt0pJofslV3eAf0fZE4kKqbOeparrX6Wx5dA5gTUyQkc5hLRWTtnYAvrh3j6f92vt7JzvxDOubRjM0T00Dt6LMwph');
    // console.log(formObject);
    // axios.post('/orders', formObject).then((res) => {
    //     new Noty({
    //         type: 'success',
    //         timeout: 1000,
    //         text:res.data.message,
    //         progressBar: false,
    //     }).show();
    //     setTimeout(() => {
    //         window.location.href = '/customers/orders';
    //     }, 1000);
    // }).catch((err)=> {
    //     new Noty({
    //         type: 'error',
    //         timeout: 1000,
    //         text: 'error',
    //         progressBar: false,
    //     }).show();
    // })
    axios.post('/orders', formObject)
        .then(function (response) {
          return response.json();
        })
        .then(function (session) {
          return stripe.redirectToCheckout({ sessionId: session.id });
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
}