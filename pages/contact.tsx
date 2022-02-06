import type { NextPage } from 'next'
import Layout from '../components/layout';

const Contact: NextPage = () => {
    return(
        <Layout>
            <p>
                Constructive criticism, suggestions, and lucritive job offers are welcome.
            </p>
            <ul>
                <li>Email: <a href="mailto:joey@josephbales.com">joey@josephbales.com</a></li>
                <li>Github: <a href="https://github.com/josephbales">josephbales</a></li>
            </ul>
        </Layout>
    );
}

export default Contact;