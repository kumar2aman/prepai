import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

function CtaSection() {
  return (
    <section className="relative z-10 px-6 py-20 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-3xl border border-blue-500/20 p-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Ace Your Next{' '}
            <span className="font-love gradient-orange   bg-clip-text text-transparent">
              Interview {" "} 
            </span>
             ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who have improved their interview skills with PrepAI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 px-8 py-4 text-lg">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
           
          </div>
        </div>
      </section>
  )
}

export default CtaSection
