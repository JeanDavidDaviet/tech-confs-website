import { IconChevronLeft, IconExternalLink } from '@supabase/ui'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '~/components/Layout'
import SectionContainer from '~/components/SectionContainer'
import { Event } from '~/types/events'
import { promises as fs } from 'fs'
import Error404 from '../404'
import path from 'path'

function Event({ event: event }: { event: Event }) {
  if (!event) return <Error404 />

  return (
    <>
      <Head>
        <title>{event.title} | Supabase Partner Gallery Example</title>
        <meta name="description" content={event.description ?? ''}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <SectionContainer>
          <div className="col-span-12 mx-auto mb-2 max-w-5xl space-y-12 lg:col-span-2">
            {/* Back button */}
            <Link
              href={`/events/`}
            >
              <a className="flex cursor-pointer items-center text-scale-1200 transition-colors hover:text-scale-1000">
                <IconChevronLeft style={{ padding: 0 }} />
                Back
              </a>
            </Link>

            <div className="flex items-center space-x-4">
              <h1 className="h1" style={{ marginBottom: 0 }}>
                {event.title}
              </h1>
            </div>

            {/* <div
              className="bg-scale-300 py-6"
              style={{
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
              }}
            >
              <Swiper
                initialSlide={0}
                spaceBetween={0}
                slidesPerView={4}
                speed={300}
                // slidesOffsetBefore={300}
                centerInsufficientSlides={true}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  720: {
                    slidesPerView: 2,
                  },
                  920: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                  1208: {
                    slidesPerView: 5,
                  },
                }}
              >
                {event.images.map((image: any, i: number) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="relative ml-3 mr-3 block cursor-move overflow-hidden rounded-md">
                        <Image
                          layout="responsive"
                          objectFit="contain"
                          width={1460}
                          height={960}
                          src={image}
                          alt={event.title}
                        />
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div> */}

            <div className="grid gap-3 space-y-16 lg:grid-cols-4 lg:space-y-0">
              <div className="lg:col-span-3">
                <h2
                  className="text-scale-1200"
                  style={{ fontSize: '1.5rem', marginBottom: '1rem' }}
                >
                  Overview
                </h2>
                {event.description}

                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: event.description ?? 'No description available' }}
                />
              </div>

              <div>
                <h2
                  className="text-scale-1200"
                  style={{ fontSize: '1.5rem', marginBottom: '1rem' }}
                >
                  Details
                </h2>

                <div className="divide-y text-scale-1200">

                  <div className="flex items-center justify-between py-2">
                    {event.img && <Image
                      width={336}
                      height={188}
                      src={event.img}
                      alt={event.title}
                    />}
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-scale-900">Playlist</span>
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-900 transition-colors hover:text-brand-800"
                    >
                      <span className="flex items-center space-x-1">
                        <span>Link to playlist</span>
                        <IconExternalLink size="small" />
                      </span>
                    </a>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-scale-900">Year</span>
                    <span className="text-scale-1200">{event.year}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <span className="text-scale-900">Tags</span>
                    <span className="text-scale-1200">{event.tags.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <span className="text-scale-900">City</span>
                    <span className="text-scale-1200">{event.city ?? ''}</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-scale-900">Languages</span>
                    <span className="text-scale-1200">{event.languages?.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </Layout>
    </>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{params: {slug: 'test'}}],
    fallback: 'blocking',
  }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const jsonDirectory = path.join(process.cwd(), 'json')
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8')
  const events = JSON.parse(fileContents);
  return {
    props: { event: events.find((e: Event) => e.slug === params?.slug) }
  }
}

export default Event
