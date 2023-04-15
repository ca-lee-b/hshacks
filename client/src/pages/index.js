import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Navbar from '../components/Navbar';

export default function Home() {

  const [local, setLocal] = useLocalStorage("data");

  return (
    <main className=" min-h-screen bg-brand-background">
      <Navbar />
      <div className="text-brand-primary text-center font-bold text-3xl">
        dsalkdjsakld
        </div>
    </main>
  )
}
