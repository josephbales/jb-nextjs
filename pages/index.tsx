import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Firstpostlink from '../components/firstpostlink'
import Layout, { siteTitle } from '../components/layout'
import { getPostsForRSS, getSortedPostsData } from '../lib/posts'
import { generateRSSFeed } from '../lib/rss'

export default function Home({
  firstPostData
}: {
  firstPostData: {
    id: string
    date: string
  }
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle} - Table of Contents</title>
        <link rel="alternate" type="application/rss+xml" title="Subscribe to my feed!" href="/feed.xml" />
      </Head>
      <article>
        <header>
          <h2>Table of Contents</h2>
        </header>
        <ul>
          <li><Firstpostlink id={firstPostData.id} dateString={firstPostData.date} title="Latest Post"></Firstpostlink></li>
          <li><Link href="/blog"><a >Blog</a></Link></li>
          <li><Link href="/about"><a>About</a></Link></li>
          <li><Link href="/contact"><a>Contact</a></Link></li>
          <li><a href="/feed.xml">RSS</a></li>
        </ul>
      </article>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  generateRSSFeed(await getPostsForRSS());
  const firstPostData = (await getSortedPostsData())[0]
  return {
    props: {
      firstPostData
    }
  }
}
