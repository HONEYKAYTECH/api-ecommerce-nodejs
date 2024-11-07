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





//db connect
dbConnect()
const app = express();

//Stripe webhook
//Stripe instance
const stripe =  new Stripe(process.env.STRIPE_KEY);

//This is your Stripe CLI webhook secret for testing your endpoints locally
const endPointSecret = 
'whsec_2f6ec2c3d5465a800d567a8e87b91d44dff1e93f3cde08657935012af31cc99b'


app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try{
        event = stripe.webhooks.constructEvent(request.body, sig, endPointSecret)
        console.log("event");
    } catch (err) {
        response.status(400).send(`webhook Error: ${err.message}`);
        return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
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


//err handler
// app.use(notFound);
app.use(globalErrhandler);


//MaleeqBryan
export default app;