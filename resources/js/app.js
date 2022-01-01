import axios from 'axios'
let addToCart=document.querySelectorAll('.add-to-cart');
let cartCounter=document.querySelector('#cartCounter');
// sessionStorage.setItem('name','nihal');
 async function updateCart(pizza){
// add to cart
try{
   let a=await axios.post('/updateCart',pizza);
   cartCounter.innerText=a.data.totalQty;
   alert("item added");
   console.log(cartCounter.innerText);
}
catch(err){
    console.log(err);
}
}
addToCart.forEach((btn)=>{
btn.addEventListener('click',(e)=>{
    console.log("clicked");
    let pizza=btn.dataset.pizza;  
    pizza=JSON.parse(pizza);
    updateCart(pizza);
    
    console.log(pizza.image);
})
})       