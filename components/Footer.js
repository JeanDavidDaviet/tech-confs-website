import Link from "next/link";

export default function Footer() {
    return (
        <footer className="px-2 sm:px-4">
            <div className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6">
                <span className="text-sm text-gray-500 sm:text-center">© 2023 <Link href="/" className="hover:underline">Techtalks</Link>
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
                    <li>
                        <Link href="/" className="mr-4 hover:underline md:mr-6 ">Conferences</Link>
                    </li>
                    <li>
                        <Link href="/about" className="mr-4 hover:underline md:mr-6 ">About</Link>
                    </li>
                    <li>
                        <Link href="https://twitter.com/JeanDavidDaviet" target="_blank" rel="noopener" className="hover:underline">Contact</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}