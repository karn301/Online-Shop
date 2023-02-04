const express = require('express')
const Stripe = require('stripe')
const { Order } = require('../models/order')
require("dotenv").config()
const stripe = Stripe(process.env.STRIPE_KEY)
const router = express.Router()
router.post('/create-checkout-session', async (req, res) => {
  const customer = await stripe.customers.create({
    metadata:{
userId:req.body.userId,
    }
  })
  const line_items = req.body.cartItems.map(item=>{
    return{
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          // images:[item.image.url],
          description:item.desc,
          metadata:{
            id:item.id
          }
        },
        unit_amount: item.price*100,
      },
      quantity: item.cartQuantity,
    }
  })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
  shipping_address_collection: {allowed_countries: ['US', 'CA','IN']},
  shipping_options: [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {amount: 0, currency: 'inr'},
        display_name: 'Free shipping',
        delivery_estimate: {
          minimum: {unit: 'business_day', value: 5},
          maximum: {unit: 'business_day', value: 7},
        },
      },
    },
  ],
  phone_number_collection:{
enabled:true,
  },
  customer:customer.id,
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    res.send({url:session.url});
  });


//create order
const createOrder = async(customer,data,lineItems) =>{
  // const Items = JSON.parse(customer.metadata.cart)
  const newOrder = new Order({
    userId:customer.metadata.userId,
    customerId:data.customer,
    paymentIntentId:data.payment_Intent,
    products:lineItems.data,
    subtotal:data.amount_subtotal,
    total:data.amount_total,
    shipping:data.customer_details,
    payment_status:data.payment_status
  })
  try{
    const savedOrder = await newOrder.save()
    console.log("Purchased Order: ",savedOrder)
  }catch(err){
    console.log(err)
  }
}
  //stripe webhook


// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret
// endpointSecret= "whsec_6a04d3bfbb66490607ad1590cfcfe0a4aaeb814e51d1e5848cc8b053e4fd4652";

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let data;
  let eventType
if(endpointSecret){
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("Webhook verified")
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  data = event.data.object
  eventType = event.type
}
else{
data = req.body.data.object
eventType = req.body.type

}


  // Handle the event
  
  if(eventType === "checkout.session.completed"){
    stripe.customers.retrieve(data.customer).then(
      (customer)=>{
        stripe.checkout.sessions.listLineItems(
          data.id,
          {},
          function(err, lineItems) {
            // asynchronously called
            console.log("line_items",lineItems)
            createOrder(customer,data,lineItems)
          }
        );
      }).catch(err=>console.log(err.message))
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
});


  module.exports = router