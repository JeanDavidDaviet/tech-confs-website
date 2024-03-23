import Image from 'next/image'
import Link from 'next/link'
import { Event } from '~/types/events'

export default function PartnerTileGrid({
  eventsByYear,
  hideCategories = false,
}: {
  eventsByYear: { [category: string]: Event[] }
  hideCategories?: boolean
}) {
  return (
    <>
      {Object.keys(eventsByYear).sort((a: string, b: string) => parseInt(b, 10) - parseInt(a, 10)).map((year) => (
        <div key={year} id={year} className="space-y-8">
          {!hideCategories && <h2 className="h2">{year}</h2>}
          <div className="grid  gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:max-w-none">
            {eventsByYear[year].map((e) => (
              <Link key={e.slug} href={`/events/${e.slug}`}>
                <a
                  className="
                "
                >
                  <div
                    className="

                bg-scale-100 dark:bg-scale-300
                hover:bg-scale-200 hover:dark:bg-scale-400
                group flex flex-col w-full h-full px-6 py-6 transition-all 
                border rounded 
                shadow 

               
                
                hover:shadow-lg"
                  >
                    <div className="flex w-full space-x-6">
                      {/* <div className="w-10 h-10 transition-all scale-100 group-hover:scale-110">
                        <Image
                          layout="fixed"
                          width={40}
                          height={40}
                          className="w-10 h-10 bg-gray-300 rounded-full"
                          src={e.logo}
                          alt={e.title}
                        />
                      </div> */}
                      <div>
                        <h3 className="transition-colors text-xl text-scale-1100 group-hover:text-scale-1200 mb-2">
                          {e.title}
                        </h3>
                        <p className="text-sm text-scale-900">{e.description}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
