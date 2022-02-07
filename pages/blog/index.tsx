import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import { getSortedPostsData } from '../../lib/posts'
import { GetStaticProps } from 'next'
import Postlink from '../../components/postlink'
import Postextract from '../../components/postextract'

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
        <title>{siteTitle} - Blog</title>
      </Head>

      <article>

      <header>
        <h2>Blog</h2>
      </header>

        {allPostsData.map(({ id, date, title }) => (
          <>
            <details>
              <Postlink id={id} dateString={date} title={title}></Postlink>
              <Postextract dateString={date} extract=" - todo: extract goes here" />
            </details>
          </>
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