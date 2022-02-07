import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    author: string
    contentHtml: string
  }
}) {
  const date = parseISO(postData.date)
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <header>
        <h2>{postData.title}</h2>
      </header>
      <article>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <footer>
        <p>
          Posted on <b><time dateTime="{new Date()}">{format(date, 'yyyy-MM-dd')}</time></b><br />
          Authored by <b>{ postData.author }</b>
        </p>
        <p>
          <Link href="/blog"><a>Back to Blog</a></Link>
        </p>
      </footer>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}