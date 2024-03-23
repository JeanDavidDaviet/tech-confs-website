import { IconLoader, IconSearch, Input } from '@supabase/ui'
import { error, log } from 'console'
import Head from 'next/head'
import { useRouter } from 'next/router'
import path from 'path'
import { promises as fs } from 'fs'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import Layout from '~/components/Layout'
import PartnerTileGrid from '~/components/EventTileGrid'
import SectionContainer from '~/components/SectionContainer'
import { Event } from '~/types/events'
import AddEvent from '~/components/AddEvent'

export async function getStaticProps() {
  const jsonDirectory = path.join(process.cwd(), 'json')
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8')
  const events = JSON.parse(fileContents); 

  return {
    props: {
      events,
    },
  }
}

interface Props {
  events: Event[]
}

function EventsPage(props: Props) {
  const { events: initialEvents } = props
  const [events, setEvents] = useState(initialEvents)

  const allYears = Array.from(
    new Set(initialEvents.map((e) => e.year))
  ).sort((a, b) => b - a);  

  const allTags = Array.from(
    new Set(initialEvents.map((e) => e.tags))
  )

  const eventsByYear: { [year: number]: Event[] } = {}
  events.forEach(
    (e) =>
      (eventsByYear[e.year] = [
        ...(eventsByYear[e.year] ?? []),
        e,
      ])
  )
  
  const router = useRouter()

  const meta_title = 'Find an event'
  const meta_description = `Here you can find all the replays of technical conferences about programming and IT in general.`

  return (
    <>
      <Head>
        <title>{meta_title} | Supabase Partner Gallery Example</title>
        <meta name="description" content={meta_description}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <SectionContainer className="space-y-16">
          <div>
            <h1 className="h1">{meta_title}</h1>
            <h2 className="text-xl text-scale-900 max-w-[500px]">{meta_description}</h2>
          </div>
          {/* Title */}
          <div className="grid space-y-12 md:gap-8 lg:grid-cols-12 lg:gap-16 lg:space-y-0 xl:gap-16">
            <div className="lg:col-span-4 xl:col-span-3">
              {/* Horizontal link menu */}
              <div className="space-y-6">
                {/* Search Bar */}
                <div className="hidden lg:block">
                  <div className="mb-2 text-sm text-scale-900">Years</div>
                  <div className="space-y-1">
                    {allYears.map((year) => (
                      <button
                        key={year}
                        onClick={() =>
                          router.push(`#${year}`)
                        }
                        className="block text-base text-scale-1100"
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 xl:col-span-9">
              {/* Partner Tiles */}
              <div className="grid space-y-10">
                {events.length ? (
                  <PartnerTileGrid eventsByYear={eventsByYear} />
                ) : (
                  <h2 className="h2">No Events Found</h2>
                )}
              </div>
            </div>
          </div>
          {/* Become a partner form */}
        </SectionContainer>
        <AddEvent />
      </Layout>
    </>
  )
}

export default EventsPage
