import type { NextPage } from 'next';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

const FiveHundred: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} - 500 Server Error</title>
      </Head>
      <article>
        <header>
          <h2>500 Server Error</h2>
        </header>
        <p>
          Sorry an error occurred on the server...
        </p>
      </article>
    </Layout>
  );
};

export default FiveHundred;