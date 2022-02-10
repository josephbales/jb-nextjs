import type { NextPage } from 'next';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

const FourOhFour: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} - 404 Not Found</title>
      </Head>
      <article>
        <header>
          <h2>404 Not Found</h2>
        </header>
        <p>
          Sorry this page does not exist...
        </p>
      </article>
    </Layout>
  );
};

export default FourOhFour;