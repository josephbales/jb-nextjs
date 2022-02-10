import type { NextPage } from 'next';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

const Contact: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Contact</title>
      </Head>
      <article>
        <header>
          <h2>Contact</h2>
        </header>
        <p>
          Constructive criticism, suggestions, and lucritive job offers are welcome.
        </p>
        <ul>
          <li>Email: <a href="mailto:joey@josephbales.com">joey@josephbales.com</a></li>
          <li>Github: <a href="https://github.com/josephbales">josephbales</a></li>
        </ul>
      </article>
    </Layout>
  );
};

export default Contact;