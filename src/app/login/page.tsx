'use client'

import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const LoginPage = () => {

  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  if(sessionStatus === "authenticated") router.push('/dashboard');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit=async(e: any)=>{

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

    const res = await signIn("credentials", {
      redirect: false,
      email, password,
    })
    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }

  }

  return (
    sessionStatus === "unauthenticated" && (
    <div className='flex min-h-screen flex-col items-center justify-center -my-14'>
      <div className='py-2 mt-5 px-1 sm:px-6 w-[95%] sm:w-[65%] md:w-[45%] rounded-3xl shadow-md bg-indigo-900'>
        <h1 className=' sm:text-4xl text-slate-300 text-center'>Login</h1>
        {error && <h1 className='mt-2 p-1 bg-red-600 text-white text-center text-sm rounded-lg'>{error}</h1>}
        <form onSubmit={handleSubmit} className="bg-indigo-400/20 shadow-2xl px-2 py-6 sm:px-4 rounded-2xl my-2">
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
            className="w-full mx-auto bg-indigo-500 text-gray-100 p-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>
        <div className='text-center text-gray-300 my-3' >-OR-</div>
        <div  className='text-base'>
          <button onClick={()=>{signIn("google")}} className='bg-white flex items-center gap-2 rounded-xl mx-auto'>
            <Image className='ml-2.5' width={40} height={80} src={'/google-logo.png'} alt='google-png' />
            <span className='bg-indigo-600 rounded-r-xl py-3 px-4'>Sign in with Google</span>
          </button>
        </div>
        <div  className='mt-4 mb-2 text-base '>
          <button onClick={()=>{signIn("github")}} className='bg-white flex items-center gap-2 rounded-xl mx-auto'>
            <Image className='ml-2.5' width={40} height={80} src={'/github-mark.png'} alt='github-png' />
            <span className='bg-black/80 rounded-r-xl py-3 px-4'>Sign in with GitHub</span>
          </button>
        </div>
        <div className='text-right px-2 text-base'>
          <Link  href={"/register"}>{`Don't have account ? `}<span className='underline'>Register</span></Link>
        </div>
      </div>
    </div>)
  )
}

export default LoginPage
