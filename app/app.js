import express from "express";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/userRoute.js";
import { globalErrhandler } from "../middlewares/globalErrHandler.js";
import productsRoutes from "../routes/productsRoute.js";
import categoryRoutes from "../routes/categoryRoute.js";
import brandRoutes from "../routes/brandRoute.js";
import colorRoutes from "../routes/colorRoute.js";
import reviewRoutes from "../routes/reviewRoute.js";
import orderRoutes from "../routes/ordersRoute.js";
import Order from "../model/Order.js";
import couponRoutes from "../routes/couponsRoute.js";







//db connect
dbConnect()
const app = express();

//Stripe webhook
//Stripe instance
const stripe =  new Stripe(process.env.STRIPE_KEY);

//This is your Stripe CLI webhook secret for testing your endpoints locally
const endPointSecret = 
'whsec_2f6ec2c3d5465a800d567a8e87b91d44dff1e93f3cde08657935012af31cc99b'


app.post('/webhook', express.raw({type: 'application/json'}), async(request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try{
        event = stripe.webhooks.constructEvent(request.body, sig,endPointSecret)
        console.log("event");
    } catch (err) {
    console.log("err",err.message); 
    response.status(400).send(`webhook Error: ${err.message}`);
        return;
    }
    if(event.type === "checkout.session.completed"){
      //update the order
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;
      //find the order
      const order = await Order.findByIdAndUpdate( JSON.parse(orderId),{
        totalPrice: totalAmount / 100,
        currency, paymentMethod, paymentStatus,
      },
      {
        new: true,
      }
     );   
    } else{
      return;
    }
  
    // // Handle the event
    // switch (event.type) {
    //   case "payment_intent.succeeded":
    //     const paymentIntent = event.data.object;
    //     // Then define and call a method to handle the successful payment intent.
    //     // handlePaymentIntentSucceeded(paymentIntent);
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }
  
    // Return a  200 response to acknowledge receipt of the event
    response.send();
  });



//pass incoming data
app.use(express.json());


//routes
app.use('/api/v1/users/',userRoutes);
app.use('/api/v1/products/',productsRoutes);
app.use('/api/v1/category/',categoryRoutes);
app.use('/api/v1/brand/',brandRoutes);
app.use('/api/v1/color/',colorRoutes);
app.use('/api/v1/review/',reviewRoutes);
app.use('/api/v1/orders/',orderRoutes);
app.use('/api/v1/coupons/',couponRoutes);


//err handler
// app.use(notFound);
app.use(globalErrhandler);


//MaleeqBryan
export default app;