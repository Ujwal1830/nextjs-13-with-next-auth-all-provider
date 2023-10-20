import connectToDB from "@/utils/db"
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User"
import { sendEmail } from "@/utils/mailer";

export const POST=async(request: NextRequest)=>{
    const { email, password }:any = await request.json();

    await connectToDB();
    const existingUser = await User.findOne({email});
    if(existingUser) {
        return NextResponse.json({
            error: "User already exists",
        }, {status: 400});
    }

    const ujwal = "";
    ujwal.charAt

    const username = await email.substring(0, email.charAt("@"));

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        await sendEmail({email: user.email, emailType: "VERIFY", userId: user._id})
        return NextResponse.json({
            message: "User created successfully",
            status: true,
            user
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {status: 500})
    }
}