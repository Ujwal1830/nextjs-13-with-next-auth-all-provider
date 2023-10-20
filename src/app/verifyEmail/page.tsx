'use client'

import axios from "axios"
import Link from "next/link";
import { useEffect, useState } from "react"

export default function VerifyEmailPage(){

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEMail = async()=>{
        try {
            axios.post('/api/verifyEmail',{token})
            setVerified(true);

        } catch (error: any) {
            setError(true)
            console.log(error.response.data);
            
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[])

    useEffect(()=>{
        if(token.length > 0){
            verifyUserEMail();
        }
    },[token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-lg">Verify Email</h1>
            <h2 className="p-2 bg-indigo-200 text-indigo-800 rounded-lg">
                {token ? `${token}` : "no token"}
            </h2>

            {verified && (
                <div className="my-4 flex flex-row items-center gap-2">
                    <h2 className="text-xl" >
                        Email Verified 🥳, Please 
                    </h2>
                    <Link className="px-2 bg-indigo-200 rounded-lg" href={"/login"}>
                        <span className="text-indigo-800">Login</span>
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-xl bg-red-700 text-white p-4">
                        Error
                    </h2>
                </div>
            )}
        </div>
    )
    
    
}