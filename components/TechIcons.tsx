import React from 'react'
import {
  DrizzleORM,
  Supabase,
  Nodejs,
  Stripe,
  Shadcnui,
  PostgreSQL,
  ReactQuery,
  Bun,
  TypeScript,
  TailwindCSS,
  Nextjs,
  ReactIcon
} from './icons/StackIcons'
import Image from 'next/image'

export default function TechIcons () {
  return (
    <div className='flex flex-wrap gap-4'>
      <Nextjs />
      <ReactIcon />
      <TypeScript />
      <Bun />
      <TailwindCSS />
      <Shadcnui />
      <ReactQuery />
      <DrizzleORM className='bg-black' />
      <PostgreSQL />
      <Supabase />
      <Nodejs />
      <Stripe />
      <Image
        width={20}
        height={20}
        alt='Better Auth'
        src='/better-auth.jpeg'
        className='size-4'
      />
    </div>
  )
}
