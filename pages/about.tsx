import type { NextPage } from 'next'
import Layout from '../components/layout';

const About: NextPage = () => {
    return(
        <Layout>
            <article>
                <header>
                <h2>About</h2>
                </header>
                <p>
                    This is the personal blog of Joseph &quot;Joey&quot; Bales. All posts represent my personal views and opinions 
                    and may not represent the views and opinions of anyone else in particular. This site was resurrected 
                    on April 21, 2013. Who knows what happened to the content that came before...
                </p>
                <p>
                    As near as I can tell this site is <a href="https://en.wikipedia.org/wiki/General_Data_Protection_Regulation">GDPR</a> compliant,
                    so I see no reason to put any pop-ups or other crap on it. You are not tracked in any way when coming to 
                    this site.
                </p>
            </article>
        </Layout>
    );
}

export default About;