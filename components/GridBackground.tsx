// import React from 'react'

// interface GridBackgroundProps {
//   children?: React.ReactNode
//   className?: string
//   gridLines?: number
//   showCorners?: boolean
//   showGradient?: boolean
//   // Grid line properties
//   gridLineWidth?: number
//   gridLineStyle?: 'solid' | 'dashed' | 'dotted'
//   showGridLines?: boolean
//   hideOuterGridLines?: boolean
//   // Outer border properties
//   showOuterBorder?: boolean
//   outerBorderWidth?: number
//   outerBorderStyle?: 'solid' | 'dashed' | 'dotted'
// }

// export function GridBackground ({
//   children,
//   className = '',
//   gridLines = 13,
//   showCorners = true,
//   showGradient = true,
//   // Grid line properties
//   gridLineWidth = 1,
//   gridLineStyle = 'solid',
//   showGridLines = true,
//   hideOuterGridLines = true,
//   // Outer border properties
//   showOuterBorder = true,
//   outerBorderWidth = 1,
//   outerBorderStyle = 'dotted'
// }: GridBackgroundProps) {
//   // Outer border styles
//   const outerBorderClass = showOuterBorder ? 'border' : ''
//   const outerBorderStyles = showOuterBorder
//     ? { borderWidth: `${outerBorderWidth}px`, borderStyle: outerBorderStyle }
//     : {}

//   return (
//     <div
//       className={`relative h-full w-full ${outerBorderClass} ${className} overflow-hidden`}
//       style={outerBorderStyles}
//     >
//       {/* Grid lines */}
//       {showGridLines && (
//         <div className='absolute inset-0 pointer-events-none'>
//           {/* Vertical lines */}
//           {Array.from({ length: gridLines }).map((_, i) => {
//             // Skip first and last lines if hideOuterGridLines is true
//             if (hideOuterGridLines && (i === 0 || i === gridLines - 1)) {
//               return null
//             }
//             return (
//               <div
//                 key={`v-${i}`}
//                 className={`absolute h-full left-0 ${
//                   gridLineWidth === 1 ? 'w-px' : ''
//                 } bg-border/30`}
//                 style={{
//                   left: `${(i / (gridLines - 1)) * 100}%`,
//                   ...(gridLineWidth !== 1
//                     ? { width: `${gridLineWidth}px` }
//                     : {}),
//                   ...(gridLineStyle !== 'solid'
//                     ? {
//                         width: 'auto',
//                         borderLeftWidth: `${gridLineWidth}px`,
//                         borderLeftStyle: gridLineStyle,
//                         borderLeftColor: 'var(--border)'
//                       }
//                     : {})
//                 }}
//               />
//             )
//           })}
//           {/* Horizontal lines */}
//           {Array.from({ length: gridLines }).map((_, i) => {
//             // Skip first and last lines if hideOuterGridLines is true
//             if (hideOuterGridLines && (i === 0 || i === gridLines - 1)) {
//               return null
//             }
//             return (
//               <div
//                 key={`h-${i}`}
//                 className={`absolute w-full top-0 ${
//                   gridLineWidth === 1 ? 'h-px' : ''
//                 } bg-border/30`}
//                 style={{
//                   top: `${(i / (gridLines - 1)) * 100}%`,
//                   ...(gridLineWidth !== 1
//                     ? { height: `${gridLineWidth}px` }
//                     : {}),
//                   ...(gridLineStyle !== 'solid'
//                     ? {
//                         height: 'auto',
//                         borderTopWidth: `${gridLineWidth}px`,
//                         borderTopStyle: gridLineStyle,
//                         borderTopColor: 'var(--border)'
//                       }
//                     : {})
//                 }}
//               />
//             )
//           })}

//           {/* Corner elements */}
//           {showCorners && (
//             <>
//               <div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary' />
//               <div className='absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary' />
//               <div className='absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary' />
//               <div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary' />
//             </>
//           )}
//         </div>
//       )}

//       {/* Gradient background effect */}
//       {showGradient && (
//         <div className='absolute -z-10 h-[50%] w-[50%] rounded-full blur-[100px] bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-orange-500/20 opacity-60' />
//       )}

//       {/* Content */}
//       <div className='h-full w-full flex-center min-h-full'>{children}</div>
//     </div>
//   )
// }

'use client'

import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

interface GridBackgroundProps {
  children?: React.ReactNode
  className?: string
  gridDensity?: 'low' | 'medium' | 'high' // Instead of a specific number
  showCorners?: boolean
  showGradient?: boolean
  // Grid line properties
  gridLineWidth?: number
  gridLineStyle?: 'solid' | 'dashed' | 'dotted'
  showGridLines?: boolean
  hideOuterGridLines?: boolean
  // Outer border properties
  showOuterBorder?: boolean
  outerBorderWidth?: number
  outerBorderStyle?: 'solid' | 'dashed' | 'dotted'
  // Animation properties
  animate?: boolean
  animationDelay?: number
}

export function GridBackground ({
  children,
  className = '',
  gridDensity = 'high',
  showCorners = true,
  showGradient = true,
  // Grid line properties
  gridLineWidth = 1,
  gridLineStyle = 'solid',
  showGridLines = true,
  hideOuterGridLines = true,
  // Outer border properties
  showOuterBorder = true,
  outerBorderWidth = 1,
  outerBorderStyle = 'dotted',
  // Animation properties
  animate = true,
  animationDelay = 0
}: GridBackgroundProps) {
  // Determine grid lines based on density
  const gridLinesMap = {
    low: { base: 5, sm: 7, md: 9, lg: 11, xl: 13 },
    medium: { base: 7, sm: 9, md: 11, lg: 13, xl: 15 },
    high: { base: 9, sm: 13, md: 17, lg: 21, xl: 25 }
  }

  const gridLinesConfig = gridLinesMap[gridDensity]

  // Outer border styles
  const outerBorderClass = showOuterBorder ? 'border' : ''
  const outerBorderStyles = showOuterBorder
    ? { borderWidth: `${outerBorderWidth}px`, borderStyle: outerBorderStyle }
    : {}

  // Container ref for dimensions
  const containerRef = useRef<HTMLDivElement>(null)
  const [gridLines, setGridLines] = React.useState(gridLinesConfig.base)
  const [isSquare, setIsSquare] = React.useState(true)

  // Update grid lines based on container size
  useEffect(() => {
    if (!containerRef.current) return

    const updateGridLines = () => {
      const container = containerRef.current
      if (!container) return

      const { width } = container.getBoundingClientRect()

      // Determine grid lines based on breakpoints
      let lines = gridLinesConfig.base
      if (width >= 1280) lines = gridLinesConfig.xl
      else if (width >= 1024) lines = gridLinesConfig.lg
      else if (width >= 768) lines = gridLinesConfig.md
      else if (width >= 640) lines = gridLinesConfig.sm

      setGridLines(lines)

      // Check if the container is approximately square
      const { height } = container.getBoundingClientRect()
      setIsSquare(Math.abs(width - height) < 20)
    }

    updateGridLines()
    window.addEventListener('resize', updateGridLines)
    return () => window.removeEventListener('resize', updateGridLines)
  }, [gridDensity])

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delay: animationDelay,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  }

  const gridLinesVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.7,
        staggerChildren: 0.03
      }
    }
  }

  const lineVariants: Variants = {
    hidden: { scaleX: 0, scaleY: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      scaleY: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  const cornerVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3, 
        delay: 0.5 
      }
    }
  }

  const gradientVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 0.6, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        delay: 0.3 
      }
    }
  }

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.2 
      }
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative h-full w-full ${outerBorderClass} ${className} overflow-hidden z-0`}
      style={outerBorderStyles}
      initial={animate ? 'hidden' : 'visible'}
      animate="visible"
      variants={containerVariants}
    >
      {/* Grid lines */}
      {showGridLines && (
        <motion.div 
          className='absolute inset-0 pointer-events-none'
          variants={gridLinesVariants}
        >
          {/* Vertical lines */}
          {Array.from({ length: gridLines }).map((_, i) => {
            // Skip first and last lines if hideOuterGridLines is true
            if (hideOuterGridLines && (i === 0 || i === gridLines - 1)) {
              return null
            }
            return (
              <motion.div
                key={`v-${i}`}
                className={`absolute h-full left-0 ${
                  gridLineWidth === 1 ? 'w-px' : ''
                } bg-border/30`}
                variants={lineVariants}
                custom={i}
                style={{
                  left: `${(i / (gridLines - 1)) * 100}%`,
                  ...(gridLineWidth !== 1
                    ? { width: `${gridLineWidth}px` }
                    : {}),
                  ...(gridLineStyle !== 'solid'
                    ? {
                        width: 'auto',
                        borderLeftWidth: `${gridLineWidth}px`,
                        borderLeftStyle: gridLineStyle,
                        borderLeftColor: 'var(--border)'
                      }
                    : {})
                }}
              />
            )
          })}
          {/* Horizontal lines */}
          {Array.from({
            length: isSquare ? gridLines : Math.ceil(gridLines * 0.75)
          }).map((_, i) => {
            // Skip first and last lines if hideOuterGridLines is true
            const totalLines = isSquare
              ? gridLines
              : Math.ceil(gridLines * 0.75)
            if (hideOuterGridLines && (i === 0 || i === totalLines - 1)) {
              return null
            }
            return (
              <motion.div
                key={`h-${i}`}
                className={`absolute w-full top-0 ${
                  gridLineWidth === 1 ? 'h-px' : ''
                } bg-border/30`}
                variants={lineVariants}
                custom={i}
                style={{
                  top: `${(i / (totalLines - 1)) * 100}%`,
                  ...(gridLineWidth !== 1
                    ? { height: `${gridLineWidth}px` }
                    : {}),
                  ...(gridLineStyle !== 'solid'
                    ? {
                        height: 'auto',
                        borderTopWidth: `${gridLineWidth}px`,
                        borderTopStyle: gridLineStyle,
                        borderTopColor: 'var(--border)'
                      }
                    : {})
                }}
              />
            )
          })}

          {/* Corner elements */}
          {showCorners && (
            <>
              <motion.div 
                className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary' 
                variants={cornerVariants}
              />
              <motion.div 
                className='absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary' 
                variants={cornerVariants}
              />
              <motion.div 
                className='absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary' 
                variants={cornerVariants}
              />
              <motion.div 
                className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary' 
                variants={cornerVariants}
              />
            </>
          )}
        </motion.div>
      )}

      {/* Gradient background effect */}
      {showGradient && (
        <motion.div 
          className='absolute -z-10 h-[50%] w-[50%] rounded-full blur-[100px] bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-orange-500/20' 
          variants={gradientVariants}
        />
      )}

      {/* Content */}
      <motion.div 
        className='h-full w-full flex-center min-h-full relative'
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
