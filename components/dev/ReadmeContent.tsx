import ReactMarkdown from 'react-markdown'
import { readFileSync } from 'fs'
import path from 'path'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export function ReadmeContent () {
  const readmePath = path.join(process.cwd(), 'README.md')
  const readmeContent = readFileSync(readmePath, 'utf-8')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='border-2 border-black dark:border-white px-4 py-2 font-silkscreen text-sm hover:bg-black/5 dark:hover:bg-white/5'>
          README.md
        </button>
      </DialogTrigger>
      <DialogContent className='p-0 gap-0  bg-white dark:bg-black'>
        <div className=' px-4 py-2 flex justify-between items-center'>
          <DialogTitle className='font-mono text-xs p-0 m-0'>
            README.md
          </DialogTitle>
        </div>
        <div className='p-4 overflow-y-auto max-h-[70vh]'>
          <ReactMarkdown className='prose dark:prose-invert prose-sm max-w-none font-mono text-xs [&>h1]:font-mono [&>h2]:font-mono [&>h1]:text-sm [&>h2]:text-xs [&>h2]:mt-6 [&>h2]:mb-2 [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2'>
            {readmeContent}
          </ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  )
}
