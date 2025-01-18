'use client'

import React, { useEffect, useState } from 'react'

export default function ViewportIndicator ({
  hideDisplayType,
  hideWidth,
  hideTailwindValues,
  hideBreakpoints,
  grayscale
}: Readonly<{
  hideDisplayType?: boolean
  hideWidth?: boolean
  hideTailwindValues?: boolean
  hideBreakpoints?: boolean
  grayscale?: boolean
}>) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)

    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const breakpoints = [
    {
      name: 'mobile',
      range: '<640',
      device: 'phone',
      colorBg: 'bg-white',
      grayBg: 'bg-white',
      textColor: 'text-black',
      showClass: 'sm:hidden'
    },
    {
      name: 'sm',
      range: '640-767',
      device: 'phone/tablet',
      colorBg: 'bg-gray-300',
      grayBg: 'bg-gray-300',
      textColor: 'text-black',
      showClass: 'hidden sm:block md:hidden'
    },
    {
      name: 'md',
      range: '768-1023',
      device: 'tablet',
      colorBg: 'bg-purple-500',
      grayBg: 'bg-gray-500',
      textColor: 'text-white',
      showClass: 'hidden md:block lg:hidden'
    },
    {
      name: 'lg',
      range: '1024-1279',
      device: 'laptop',
      colorBg: 'bg-orange-500',
      grayBg: 'bg-gray-600',
      textColor: 'text-white',
      showClass: 'hidden lg:block xl:hidden'
    },
    {
      name: 'xl',
      range: '1280-1535',
      device: 'desktop',
      colorBg: 'bg-green-500',
      grayBg: 'bg-gray-700',
      textColor: 'text-white',
      showClass: 'hidden xl:block 2xl:hidden'
    },
    {
      name: '2xl',
      range: '1536+',
      device: 'large screen',
      colorBg: 'bg-blue-500',
      grayBg: 'bg-gray-800',
      textColor: 'text-white',
      showClass: 'hidden 2xl:block'
    }
  ]

  return (
    <div className='fixed bottom-0 right-0 p-2 text-[10px] font-mono'>
      {breakpoints.map(bp => (
        <div
          key={bp.name}
          className={`${grayscale ? bp.grayBg : bp.colorBg} ${bp.textColor} ${
            bp.showClass
          } p-1`}
        >
          {!hideTailwindValues && <>{bp.name}: </>}
          {!hideBreakpoints && <span className='opacity-50'>{bp.range}</span>}
          {!hideWidth && <> • {width}</>}
          {!hideDisplayType && (
            <span className='font-bold'> • {bp.device}</span>
          )}
        </div>
      ))}
    </div>
  )
}
