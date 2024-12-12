import React from 'react'
import Signup from '../components/forms/Signup'

const page = () => {
  return (
    <main className='min-h-screen w-full flex items-center justify-center' style={{
        backgroundImage : "url('/bg2.jpg')" ,
        backgroundSize:"cover" ,
        backgroundRepeat:"no-repeat",
        backgroundAttachment:"fixed",
    }}>
        <Signup/>
    </main>
  )
}

export default page
