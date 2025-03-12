"use client"
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

function Header() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center p-10 bg-gray-800 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Welcome!</h1>
        <div className="flex gap-4">
        <LoginLink><Button variant="ghost" color="black">Login</Button></LoginLink>
        <RegisterLink><Button variant="ghost">Register</Button></RegisterLink>
        </div>
      </div>
    </div>

    
    
  )
}

export default Header


