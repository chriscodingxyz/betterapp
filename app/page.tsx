'use client'

// import SetupChecks from '@/components/dev/SetupChecks'
import { ThemeLogo } from '@/components/theme/ThemeLogo'
// import RandomFact from '@/components/RandomFact'
import { ShadowButton } from '@/components/ShadowButton'
import { MetallicText } from '@/components/MetallicText'
import { GridBackground } from '@/components/GridBackground'
import TechIcons from '@/components/TechIcons'
// import Image from 'next/image'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Home () {
  // revalidate every 7 minutes
  // const response = await fetch('http://numbersapi.com/random', {
  //   next: {
  //     revalidate: 420,
  //     tags: ['numberFact']
  //   }
  // })
  // const rawText = await response.text()

  // Animation variants for children elements
  // const childVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.5 }
  //   }
  // }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2
      }
    }
  }

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  }

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: 0.7
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  }

  const techIconsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.9,
        duration: 0.5
      }
    }
  }

  return (
    <>
      {/* Main section full screen */}
      <div className='min-h-[calc(100vh-40px)] py-12 flex-center-col'>
        <div className='container max-w-xl h-full flex-center z-10 relative'>
          <GridBackground
            className='absolute inset-0'
            gridLineWidth={1}
            gridLineStyle='solid'
            showOuterBorder={true}
            outerBorderWidth={1}
            outerBorderStyle='dotted'
            hideOuterGridLines={true}
            animate={true}
            animationDelay={0.1}
          >
            <motion.div
              className='flex flex-col items-center gap-4 py-12 px-1'
              initial='hidden'
              animate='visible'
            >
              <div className='flex flex-col items-center gap-0'>
                <div className='flex flex-col items-center gap-2 mb-10'>
                  <motion.div
                    className='text-6xl font-bold text-balance tracking-tighter leading-none text-center max-w-3xl'
                    variants={titleVariants}
                  >
                    Roll your own <MetallicText>SaaS</MetallicText> in minutes!
                  </motion.div>
                  <motion.div
                    className='text-xl text-muted-foreground'
                    variants={subtitleVariants}
                  >
                    Launch faster with confidence
                  </motion.div>
                </div>
                <motion.div variants={logoVariants}>
                  <ThemeLogo />
                </motion.div>
                <div className='flex flex-col items-center gap-8 border-primary z-10 -mt-2'>
                  {/* <SetupChecks />
              <RandomFact fact={rawText} /> */}
                  <motion.div variants={buttonVariants} whileHover='hover'>
                    <ShadowButton size='xs'>Initiate Checklist</ShadowButton>
                  </motion.div>
                  <motion.div variants={techIconsVariants}>
                    <TechIcons />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </GridBackground>
        </div>

        {/* Full-width features section */}
        {/* <div className='container max-w-5xl mt-24 mb-16 z-10 relative'>
        <GridBackground
          className='absolute inset-0'
          gridLineWidth={1}
          gridLineStyle='solid'
          showOuterBorder={true}
          outerBorderWidth={1}
          outerBorderStyle='dotted'
          hideOuterGridLines={true}
        >
          <div className='flex flex-col items-center gap-8 py-12 px-6'>
            <div className='text-4xl font-bold text-center mb-8'>
              Why Choose Our <MetallicText>Template</MetallicText>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
              <div className='flex flex-col items-center text-center p-4'>
                <div className='text-2xl font-semibold mb-2'>Fast Setup</div>
                <div className='text-muted-foreground'>
                  Get your SaaS up and running in minutes, not days
                </div>
              </div>
              <div className='flex flex-col items-center text-center p-4'>
                <div className='text-2xl font-semibold mb-2'>Modern Stack</div>
                <div className='text-muted-foreground'>
                  Built with the latest technologies for optimal performance
                </div>
              </div>
              <div className='flex flex-col items-center text-center p-4'>
                <div className='text-2xl font-semibold mb-2'>Customizable</div>
                <div className='text-muted-foreground'>
                  Easily adapt the template to fit your specific needs
                </div>
              </div>
            </div>
            <ShadowButton className='mt-4'>Explore Features</ShadowButton>
          </div>
        </GridBackground>
      </div> */}

        {/* Footer */}
      </div>
      {/* Middle bit */}
      <div className='py-12 flex-center'>
        <Image
          src='/cryptoadz.gif'
          alt='Logo'
          width={150}
          height={150}
          className='self-center'
        />
      </div>

      {/* Two-column grid section */}
      <div className='container max-w-5xl mb-24 z-10 relative'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Left column */}
          <div className='relative h-full min-h-[300px]'>
            {/* <GridBackground
              className='absolute inset-0'
              showCorners={false}
              gridLineWidth={1}
              gridLineStyle='solid'
              showOuterBorder={true}
              outerBorderWidth={1}
              outerBorderStyle='dotted'
              hideOuterGridLines={true}
            > */}
            <div className='flex flex-col items-center justify-center h-full p-6'>
              <div className='text-3xl font-bold mb-4'>Getting Started</div>
              <div className='text-muted-foreground text-center mb-6'>
                Follow our simple step-by-step guide to set up your project
              </div>
              <ShadowButton size='sm'>View Documentation</ShadowButton>
            </div>
            {/* </GridBackground> */}
          </div>

          {/* Right column */}
          <div className='relative h-full min-h-[300px]'>
            {/* <GridBackground
              showCorners={false}
              className='absolute inset-0'
              gridLineWidth={1}
              gridLineStyle='solid'
              showOuterBorder={true}
              outerBorderWidth={1}
              outerBorderStyle='dotted'
              hideOuterGridLines={true}
            > */}
            <div className='flex flex-col items-center justify-center h-full p-6'>
              <div className='text-3xl font-bold mb-4'>Community</div>
              <div className='text-muted-foreground text-center mb-6'>
                Join our growing community of developers and entrepreneurs
              </div>
              <ShadowButton size='sm'>Join Discord</ShadowButton>
            </div>
            {/* </GridBackground> */}
          </div>
        </div>
      </div>
    </>
  )
}
