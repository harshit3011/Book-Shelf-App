import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: "Book" // Reference to the Book model
        }
    ]
},{
    timestamps: true
})

export const User = mongoose.model("user",userSchema)