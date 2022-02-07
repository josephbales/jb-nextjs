import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Firstpostlink from '../components/firstpostlink'
import Layout, { siteTitle } from '../components/layout'
import { generateRSSFeed, getSortedPostsData } from '../lib/posts'

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
          <li><a>RSS (todo)</a></li>
        </ul>
      </article>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // TODO: finish generating RSS feed https://ashleemboyer.com/blog/how-i-added-an-rss-feed-to-my-nextjs-site
  generateRSSFeed(articles);
  const firstPostData = getSortedPostsData()[0]
  return {
    props: {
      firstPostData
    }
  }
}
