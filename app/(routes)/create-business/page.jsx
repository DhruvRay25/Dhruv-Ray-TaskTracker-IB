import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'

function CreateBusiness() {
  return (
    <div>
      <Image src='/mcdonald-s-15-logo-svgrepo-com.svg' alt="logo" width={200} height={200} />
      <div className='flex flex-cl items-center gap-4 m-w-3xl'>
        <h2 className='text-4xl font-bold'>What should we call your business?</h2>
        <p className='text-slate-500'>You can always change this later from settings!</p>
        <div>
            <label>Team Name</label>
            <Input placeholder="Lol"></Input>
        </div>
      </div>
    </div>
  )
}

export default CreateBusiness
