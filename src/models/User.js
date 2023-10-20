import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
    },
    email:{
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password:{
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = models.users || model("users", userSchema);

export default User;