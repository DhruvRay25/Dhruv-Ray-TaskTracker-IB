"use client"
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

function Header() {
  return (
    <div>
      <LoginLink><Button variant="ghost" color="black">Login</Button></LoginLink>
      <RegisterLink><Button variant="ghost">Register</Button></RegisterLink>

    </div>
  )
}

export default Header
