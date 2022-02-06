import Link from "next/link";

export default function Topnav() {
    return (
        <>
            <nav className="container-fluid main-nav-menu">
                <ul>
                    <li><Link href="/"><a className="contrast" ><strong>josephbales.com (make dynamic)</strong></a></Link></li>
                </ul>
                <ul>
                    <li><Link href="blog"><a className="contrast">Blog</a></Link></li>
                    <li><Link href="about"><a className="contrast">About</a></Link></li>
                    <li><Link href="contact"><a className="contrast">Contact</a></Link></li>
                </ul>
            </nav>
        </>
        
    )
  }