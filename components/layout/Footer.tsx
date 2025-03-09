import Image from 'next/image'
import React from 'react'
import { MetallicText } from '../MetallicText'

export default function Footer () {
  return (
    <footer className='container max-w-5xl mb-12 z-10 relative'>
      <div className='border-t border-border/40 pt-12 pb-8 px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center md:items-end'>
          <div className='flex flex-col items-center md:items-start mb-8 md:mb-0'>
            <div className='flex items-center gap-3 mb-3'>
              <Image
                src='/avatar.png'
                alt='Logo'
                width={36}
                height={36}
                className='border border-black'
              />
              <span className='font-semibold text-lg'>
                <MetallicText>FLUID</MetallicText>
              </span>
            </div>
            <div className='text-[10px] text-muted-foreground'>
              © 2025 BetterApp Template. All rights reserved.
            </div>
          </div>
          <div className='grid grid-cols-3 gap-x-6 md:gap-x-12 gap-y-8 w-full md:w-auto text-center md:text-left'>
            <div className='flex flex-col items-center md:items-start'>
              <div className='font-semibold mb-3 text-primary'>Resources</div>
              <div className='flex flex-col gap-2 text-sm'>
                <span className='hover:text-primary cursor-pointer transition-colors'>
                  Documentation
                </span>
                <span className='hover:text-primary cursor-pointer transition-colors'>
                  Tutorials
                </span>
                <span className='hover:text-primary cursor-pointer transition-colors'>
                  Examples
                </span>
              </div>
            </div>
            <div className='flex flex-col items-center md:items-start'>
              <div className='font-semibold mb-3 text-primary'>Company</div>
              <div className='flex flex-col gap-2 text-sm'>
                <span className='hover:text-primary cursor-pointer transition-colors'>
                  About
                </span>
                <span className='hover:text-primary cursor-pointer transition-colors'>
                  Blog
                </span>
                <span className='hover:text-primary cursor-pointer transition-colors'>
                  Contact
                </span>
              </div>
            </div>
            <div className='flex flex-col items-center md:items-start'>
              <div className='font-semibold mb-3 text-primary'>Legal</div>
              <div className='flex flex-col gap-2 text-sm'>
                <span className='hover:text-primary cursor-pointer transition-colors'>
                  Privacy
                </span>
                <span className='hover:text-primary cursor-pointer transition-colors'>
                  Terms
                </span>
                <span className='hover:text-primary cursor-pointer transition-colors'>
                  Cookies
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-xs text-center text-muted-foreground mt-4'>
        <span>mobile: <span className='text-muted-foreground/60'>&lt;640</span> • 500 • <span className='font-medium'>phone</span></span>
      </div>
    </footer>
  )
}
