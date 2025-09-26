import Image from 'next/image'
import React from 'react'

const SpacePage = () => {
  return (
    <>
    <div className="w-full max-h-screen h-screen flex flex-col justify-center items-center">
      <div className="">
        <Image src={'/assets/images/space/click.png'} alt='' width={500} height={500} unoptimized/>
      </div>
      <div className="">
        <p className='text-xl font-medium'>Please click the space to see the message.</p>
      </div>
    </div>
    </>
  )
}

export default SpacePage