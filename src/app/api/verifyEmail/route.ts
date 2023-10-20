import connectToDB from "@/utils/db";
import { sendEmail } from "@/utils/mailer";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";


connectToDB();

export async function POST(request: NextRequest){

    try {
        
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);

        const user = await User.findOne({ 
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        })

        console.log(user);

        if(!user){
            return NextResponse.json({
                error: "Invalid token",
            }, {status: 400});
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        const savedUser = await user.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "Email Verified successfully",
            success: true,
        })

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            error:error.message,
        }, {status: 500})
    }
}

