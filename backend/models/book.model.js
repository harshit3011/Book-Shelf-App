import mongoose, {Schema} from "mongoose";

const SAMPLE_IMAGE_URL = "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop";

const bookSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    author:{
        type: String,
        required: true,
        trim: true
    },
    image:{
        type: String,
        default: SAMPLE_IMAGE_URL
    },
    bookOf:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
},{
    timestamps: true
})

export const Book = mongoose.model("book",bookSchema)