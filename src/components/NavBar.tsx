"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NavBar = () => {
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter()

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const userName = session?.user?.email;
    const userNameChar = userName?.charAt(0).toUpperCase();
    const newUserName = userName && userNameChar + userName.substring(1, userName?.lastIndexOf("@"));

    const handleMouseEnter = (e: any) => {
        const tooltip = e.currentTarget.querySelector('.tooltip');
        if (tooltip) {
          tooltip.style.visibility = 'visible';
        }
      };
    
      const handleMouseLeave = (e: any) => {
        const tooltip = e.currentTarget.querySelector('.tooltip');
        if (tooltip) {
          tooltip.style.visibility = 'hidden';
        }
      };


  return (
    <div className="bg-indigo-900 text-white">
      <nav className="flex flex-wrap items-center justify-between px-4 py-1">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link href="/">
            <p className="text-xl cursor-pointer">Home</p>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 4h20v2H0zm0 5h20v2H0zm0 5h20v2H0z" />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full flex-grow md:flex md:items-center md:w-auto`}
        >
          <div className="flex md:flex-grow bg-indigo-950 md:bg-indigo-900 py-1 my-1 px-2 rounded-lg">
            <Link href="/dashboard">
              <p className="mr-4">Dashboard</p>
            </Link>
          </div>
          <div className="" >
            {sessionStatus === "unauthenticated" ? (
              <div className='md:flex gap-4 '>
                <div  className="py-1 my-1 bg-indigo-950 md:bg-indigo-900 px-2 rounded-lg">
                    <Link href="/login"><p>SignIn</p></Link>
                </div>             
                <div className=" py-1 my-1 bg-indigo-950 md:bg-indigo-900 px-2 rounded-lg">
                    <Link href="/register"><p>Register</p></Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:gap-4 mb-4 md:mb-0">
                { sessionStatus === "authenticated" && 
                    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <span className="px-3 py-1 bg-purple-500 border rounded-full relative">
                      {userNameChar}
                      <div className="tooltip bg-white text-black text-xs px-4 py-2 rounded-lg absolute -bottom-14 transform -translate-x-1/2 opacity-1 pointer-events-none transition-opacity duration-300">
                        {userName}
                      </div>
                    </span>
                  </div>}
                <button
                  onClick={() => {
                    signOut();
                    router.replace('/');
                  }}
                  className="text-left px-2 py-1"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
