import Head from 'next/head'
import Image from 'next/image'
import path from 'path'
import { promises as fs } from 'fs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), 'json')
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8')
  const conferences = JSON.parse(fileContents);

  return {
    props: {
      conferences,
    },
  }
}

export default function Home({ conferences }) {
  return (
    <>
      <Head>
        <title>Tech confs</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <ul className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {conferences.map((conference, id) => (
            <li key={ id } className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                <Link href={ conference.url } target="_blank" rel="noopener">
                </Link>
                <div className="p-5">
                    <Link href={ conference.url } target="_blank" rel="noopener">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{ conference.title }</h5>
                    </Link>
                    <Link href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Watch
                        <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  )
}
