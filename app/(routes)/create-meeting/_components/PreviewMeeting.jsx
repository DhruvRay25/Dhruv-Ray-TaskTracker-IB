import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function PreviewMeeting({formValue}) {
  return (
    <div className='p-5 py-10 shadow-lg m-5 border-t-8'> 
      <Image src={'/mcdonald-s-15-logo-svgrepo-com.svg'} alt="logo"
        height={150} width={150}
      />

      <div className='grid grid-cols-1 md:grid-cols-3 mt-5'>
        {/*Meeting Info*/}
        <div className='p-4 border-r'>
            <h2>User Name</h2>
            <h2
            className='font-bold text-2xl'
            >{formValue?.eventName?formValue?.eventName:'Meeting Name'}</h2>
            <div className='mt-5 flex-col gap-4'>
              <h2 className='flex gap-2'><Clock/>{formValue?.duration} Min</h2>
              <h2 className='flex gap-2'><MapPin/>{formValue?.setLocation} Meeting</h2>
            </div>
        </div>
        {/*Meeting Info*/}
        <div className='md:col-span-2'>

        </div>

      </div>
    </div>
  )
}

export default PreviewMeeting
