import React from 'react'
import {MdHome} from 'react-icons/md';
function Home() {
  return (
    <div className='w-full h-full'>
      <div className='flex flex-row justify-start items-center gap-4'>
        <MdHome className='text-3xl font-bold'/> 
        <h1 className='text-3xl font-bold'>Home</h1>
      </div>
    </div>
  )
}

export default Home