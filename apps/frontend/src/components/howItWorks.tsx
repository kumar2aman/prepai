import React from 'react'
import { Button } from './ui/button'
import { Play } from 'lucide-react'

function HowItWorks() {
  return (
    <div>
        <div className='flex flex-col justify-center items-center w-full mt-24'>
            <h1 className='font-ubuntu font-medium text-6xl mb-6 text-center'>
                How <span className='gradient-blue  text-transparent bg-clip-text'>PrepAi</span>  Works 
              
            </h1>
            <Button size={"xl"} variant={'outline'} className='w-42 mt-12 font-sans text-2xl hover:bg-gray-900'>
                Play <Play className='size-xl text-orange-400'/>
            </Button>
        </div>
    </div>
  )
}

export default HowItWorks  