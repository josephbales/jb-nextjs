import Head from 'next/head';
import Footer from '../components/footer';
import Topnav from '../components/topnav';

export const siteTitle = 'josephbales.com';

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="joseph bales, bales, joseph, developer" />
        <title>josephbales.com</title>
      </Head>
      <Topnav />
      <main className='container'>{children}</main>
      <Footer />
    </>
  );
}