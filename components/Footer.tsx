import { IconTwitter } from '@supabase/ui'
import DarkModeToggle from './DarkModeToggle'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="flex w-full justify-end border-t bg-scale-300 p-4">
      <Link href="https://twitter.com/JeanDavidDaviet/"><a className="flex" target='_blank'><IconTwitter className="text-scale-900 mr-4" strokeWidth={2} /></a></Link>
      <DarkModeToggle />
    </footer>
  )
}

export default Footer
