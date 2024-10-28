//Produuct Schema
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description:{
            type:String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
           type: String,
           ref: "Category",
           required: true,
        },
        Sizes: {
            type: [String],
            enum: ["S", "M", "L" , "XL", "XXL" ],
            required: true,
        },
        Colors: {
            type: [String],
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        images: [
           {
             type: String,
             default: "https://via.placeholder.com/150",
           } ,
        ],

        reviews: [
           {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Review",
           },
        ],

        price: {
            type: Number,
            required: true,
        }, 
        
        totalQty: {
            type: Number,
            required: true,
        },

        totalSold: {
            type: Number,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    },
);
//Virtuals
//Total rating
ProductSchema.virtual("totalReviews").get(function(){
    const product = this;
    return product?.reviews?.length;
    
})
//Average Ratings
ProductSchema.virtual("averageRating").get(function(){
    let ratingsTotal = 0;
    const product = this;
    product?.reviews?.forEach((review) => {
     ratingsTotal += review?.rating;   
        
    });
    //Calculate Average rating
    const averageRating = ratingsTotal / product?.reviews?.length;
    console.log(averageRating);
    
})
const Product = mongoose.model("Product", ProductSchema);

export default Product;
 
