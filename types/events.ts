export interface Event {
  title: string,
  slug: string,
  url: string,
  year: number,
  tags: string[],
  city: string | null,
  languages: string[] | null,
  img: string | null,
  description: string | null
}