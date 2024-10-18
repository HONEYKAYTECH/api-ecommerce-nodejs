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
            type: [string],
            enum: ["S", "M", "L" , "XL", "XXL" ],
            required: true,
        },
        Colors: {
            type: [String],
            required: true,
        },

        User: {
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
            default: 0,
        },    
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
 