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
          <video
  autoPlay
  
  playsInline
  loop
  controls
  width="70%"
  height="700">
  <source src="https://res.cloudinary.com/or2qjmvk/video/upload/v1783455515/InShot_compress_nemt7f.mp4" type="video/mp4"/>
</video>

           </div>
        
    </motion.div>
  )
}

export default HowItWorks  