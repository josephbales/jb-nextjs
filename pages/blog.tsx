import Date from '../components/date'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'

import { GetStaticProps } from 'next'

export default function Blog({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <article>

      <header>
        <h2>Blog</h2>
      </header>

        {allPostsData.map(({ id, date, title }) => (
          <>
      <details>
      <summary><Link href={`/posts/${id}`}><a>{title}</a></Link></summary>
      <p><Date dateString={date} /> - todo: extract goes here</p>
  </details></>
                    
                ))}

      </article>
        
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}