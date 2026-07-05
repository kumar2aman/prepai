"use client";
import React from 'react'
import { Button } from '../ui/button'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

function HowItWorks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
        <div className='flex flex-col justify-center items-center w-full mt-24'>
            <h1 className='font-ubuntu font-medium text-6xl mb-6 text-center'>
                How <span className='gradient-blue  text-transparent bg-clip-text'>PrepAi</span>  Works 
            </h1>
            <Button size={"xl"} variant={'outline'} className='w-42 mt-12 mb-7 font-sans text-2xl hover:bg-gray-900 cursor-pointer'>
                Play <Play className='size-xl text-orange-400'/>
            </Button>
            <h1 className='font-sans text-xl font-semibold  text-red-500'>Coming Soon !!</h1>
        </div>
    </motion.div>
  )
}

export default HowItWorks  