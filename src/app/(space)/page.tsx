import Image from 'next/image'
import React from 'react'

const SpacePage = () => {
  return (
    <>
    <div className="w-full max-h-screen h-screen flex flex-col justify-center items-center">
      <div className="">
        <Image src={'/images/space/click.png'} alt='' width={500} height={500}/>
      </div>
      <div className="">
        <p>Tolong klik space agar terlihat messagenya</p>
      </div>
    </div>
    </>
  )
}

export default SpacePage