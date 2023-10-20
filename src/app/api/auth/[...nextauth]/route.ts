import NextAuth from "next-auth";
import GithubProvider  from "next-auth/providers/github";
import GoogleProvider  from "next-auth/providers/google";
import CredentialsProvider  from "next-auth/providers/credentials";
import User from "@/models/User";
import connectToDB from "@/utils/db";
import bcrypt from "bcrypt"
import { sendEmail } from "@/utils/mailer";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "password", type: "password"},
            },
            async authorize( credentials: any ){
                await connectToDB();
                try {
                    const user = await User.findOne({email: credentials.email});
                    console.log(user);
                    if(user){
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                        console.log(isPasswordCorrect);
                        if(isPasswordCorrect){
                            return user;
                        }
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            }

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        })
    ],
    callbacks: {
        async signIn({ user, account }: any) {
            if(account?.provider == "credentials"){
                return true;
            }
            if(account?.provider == "google" || account?.provider == "github"){
                await connectToDB();
                try {
                    const existingUser = await User.findOne({email: user.email});
                    if(!existingUser){
                        const newUser = new User({
                            username: user.name,
                            email: user?.email,
                        });

                        await newUser.save();
                        sendEmail({ email: user?.email, emailType: "VERIFY", userId: newUser?._id })
                        return true;
                    }
                    return true;
                } catch (error: any) {
                    console.log("Error saving user", error);
                    return false;
                }
            }
            return true
        },
    }
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST } 

