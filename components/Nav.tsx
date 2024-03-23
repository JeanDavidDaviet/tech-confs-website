import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '~/lib/theme'

const Nav = () => {
  const { isDarkMode } = useTheme()

  return (
    <nav className="w-full border-b bg-scale-300 p-4">
      <Link href="/">
        <a className="flex">Tech confs</a>
      </Link>
    </nav>
  )
}

export default Nav
