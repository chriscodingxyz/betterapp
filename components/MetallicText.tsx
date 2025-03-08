'use client'

import React from 'react'

interface MetallicTextProps {
  children: React.ReactNode
  className?: string
}

export const MetallicText: React.FC<MetallicTextProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        background: 'linear-gradient(135deg, #e6e6e6 0%, #d9d9d9 10%, #c4c4c4 20%, #b3b3b3 30%, #a6a6a6 40%, #939393 50%, #7c7c7c 60%, #8c8c8c 70%, #999999 80%, #b3b3b3 90%, #d9d9d9 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 5s ease infinite',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0px 0px 3px rgba(150, 150, 150, 0.3)',
        filter: 'drop-shadow(0 0 2px rgba(192, 192, 192, 0.6))'
      }}
    >
      {children}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </span>
  )
}
