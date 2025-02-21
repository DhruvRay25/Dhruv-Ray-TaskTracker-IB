"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Plus } from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import LocationOption from '@/app/_utils/LocationOption'
import Image from 'next/image'
import ThemeOptions from '@/app/_utils/ThemeOptions'
  

function MeetingForm() {
    const [location,setLocation]=useState(); 
    const [themeColor, setThemeColor]=useState();

  return (
    <div className='p-4'>
       
           <Link href={'/dashboard'}><h2 className='flex gap-2'><ChevronLeft/>Cancel</h2></Link>
        
        <div className='mt-4'>
            <h2 className='font-bold text-2xl my-4'>Create New Event</h2>
            <hr></hr>
        
        </div>
        <div className='flex flex-col gap-3 my-4'>
            <h2 className='font-bold'>Event Name *</h2>
            <Input placeholder='Name of your Meeting Event'/>
            <h2 className='font-bold'>Duration *</h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="max-w-40" variant="outline">30 mins</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>15 Min</DropdownMenuItem>
                    <DropdownMenuItem>30 Min</DropdownMenuItem>
                    <DropdownMenuItem>45 Min</DropdownMenuItem>
                    <DropdownMenuItem>60 Min</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>

            <h2 className='font-bold'>Location *</h2>
            <div className='grid grid-cols-4 gap-3'>
                {LocationOption.map((option,index)=>(
                    <div className={`border flex flex-col justify-center items-center p-3 rounded-lg
                    hover:bg-blue-100 hover:border-primary cursor-pointer
                    ${location==option.name&&'bg-blue-100 border-primary'}`}
                    onClick={()=>setLocation(option.name)}>
                        <Image src={option.icon} width={30} height={30} alt={option.name}/>
                        <h2>{option.name}</h2>
                    
                    </div>

                )
                
                
                )}
            </div>
            {location&&<>
            <h2 className='font-bold'>Add {location} URL</h2>
            <Input placeholder='Add URL'/>
            </>}
            <h2 className='font-bold'>Select Theme Color</h2>
            <div className='flex justify-evenly'>
                {ThemeOptions.map((color,index)=>(
                    <div className={`h-7 w-7 rounded-full
                    ${themeColor==color&&'border border-black'}`}
                    style={{backgroundColor:color}}
                    onClick={()=>setThemeColor(color)}
                    >
                    
                    </div>
                ))}
            </div>
        
        </div>

        <Button className="w-full mt-9">Create Meeting</Button>
  
    </div>
  )
}

export default MeetingForm
