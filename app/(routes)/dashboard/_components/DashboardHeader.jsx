"use client"
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

function DashboardHeader() {
  const {user} = useKindeBrowserClient();
  
    return (
    <div className='p-4 px-10'>
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center float-right'>
                
                    <Image src={user?.picture} alt='logo' 
                    width={40}
                    height={40} 
                    className='rounded-full'/>
                    <ChevronDown/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>
                        <LogoutLink>Logout</LogoutLink>

                    </DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>

                </DropdownMenuContent>
                </DropdownMenu>
            </div>
        
        
    </div>
  )
}

export default DashboardHeader
