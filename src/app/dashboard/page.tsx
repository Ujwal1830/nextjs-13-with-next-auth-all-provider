import Link from 'next/link'
import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

const DashboardPage = async() => {

  const session = await getServerSession();
  if(!session){
    redirect('/');
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center -my-14'>
      DashboardPage
    </div>
  )
}

export default DashboardPage
