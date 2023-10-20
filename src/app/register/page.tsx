"use client"

import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const RegisterPage = () => {
  
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }
  if (sessionStatus === "authenticated") {
    router.replace("/dashboard");
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if(!isValidEmail(email) && !password){ 
      setError("Fields required.")
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 4) {
      setError("Password is invalid");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  

  return (
    <div className='flex min-h-screen flex-col items-center justify-center -my-14'>
      <div className='m-4 py-6 px-1 sm:px-6 rounded-3xl shadow-md bg-indigo-400/40'>
        <h1 className=' text-2xl font-bold text-slate-300 text-center'>Register</h1>
        {error && <h1 className='mt-2 p-1 bg-red-600 text-white text-center text-sm rounded-lg'>{error}</h1>}
        <form onSubmit={handleSubmit} className="bg-indigo-950 px-2 py-6 sm:px-4 rounded-2xl my-2">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-gray-800 text-gray-300 border-b-2 border-gray-600 focus:outline-none focus:border-indigo-500 p-2 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full bg-gray-800 text-gray-300 border-b-2 border-gray-600 focus:outline-none focus:border-indigo-500 p-2 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-gray-100 p-3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
        <div className='text-center text-gray-300 my-3' >-OR-</div>
        <div className='text-right px-2'>
          <Link  href={"/login"}>{`Already have account ? `}<span className='underline'>Login</span></Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;
