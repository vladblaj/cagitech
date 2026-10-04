import { ArrowDown, ArrowUpRight, ArrowRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const projects = [
  {
    name: 'Book a Rifugio',
    category: 'Travel & hospitality',
    status: 'Public demo',
    description: 'A clearer path to the mountains.',
    detail: 'A booking experience for mountain huts, bringing discovery, availability and reservations into one place.',
    note: 'A demonstration environment. All data and reservations are illustrative.',
    image: '/bookarifugio-preview.webp',
    alt: 'Book a Rifugio booking website with a view across the Dolomites',
    url: 'https://www.bookarifugio.com/',
    action: 'Explore the demo',
    className: 'rifugio',
  },
  {
    name: 'STARE',
    category: 'Wellbeing · iPhone',
    status: 'On the App Store',
    description: 'A little space to simply sit.',
    detail: 'An intentional sitting practice with a quiet timer and one photograph at the end. A small record of taking a moment for yourself.',
    note: '',
    image: '/stare-preview.webp',
    alt: 'STARE sitting practice website and app preview',
    url: 'https://stare.bitladssoftware.com/',
    action: 'Discover STARE',
    className: 'stare',
    appStore: 'https://apps.apple.com/us/app/stare-a-sitting-practice/id6808342324',
  },
  {
    name: 'Fluxa',
    category: 'IoT · Monitoring',
    status: 'Interactive concept',
    description: 'Making the invisible visible.',
    detail: 'A tank-monitoring concept that turns sensor readings into an understandable view of levels, trends and alerts.',
    note: 'An interactive concept using simulated data, not connected field sensors.',
    image: '/fluxa-preview.webp',
    alt: 'Fluxa tank monitoring interface showing an overview of tank levels',
    url: 'https://fluxa.bitladssoftware.com/',
    action: 'Explore the concept',
    className: 'fluxa',
  },
  {
    name: 'Edge Track',
    category: 'Computer vision · Warehousing',
    status: 'Working prototype',
    description: 'From camera frames to dock decisions.',
    detail: 'A local-first warehouse concept that turns tracked truck visits and dock activity into timelines, occupancy estimates and exportable events.',
    note: 'The interactive site uses a simulated scenario. The laptop prototype has also been tested on public recorded video; live edge deployment needs a site pilot.',
    image: '/edge-track-preview.svg',
    alt: 'Edge Track illustrated dock board showing trucks, monitored zones and a visit timeline',
    url: 'https://edgetrack.bitladssoftware.com/',
    action: 'Explore Edge Track',
    className: 'edgetrack',
  },
  {
    name: 'CodTranslate',
    category: 'Documents · Operations',
    status: 'Live · sign-in required',
    description: 'Less friction in the paperwork.',
    detail: 'A private workspace for turning German and Austrian vehicle paperwork into structured Romanian registration documents and sale contracts.',
    note: 'Document workflow illustration. Access to the workspace requires an account.',
    image: '/codtranslate-visual.svg',
    alt: 'Illustration of the CodTranslate workflow from German and Austrian vehicle documents to Romanian registration documents and sale contracts',
    url: 'https://codtranslate.com/',
    action: 'Visit CodTranslate',
    className: 'codtranslate',
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.title = 'Bitlads Software — Digital Products, Automation & IoT';
    document.documentElement.lang = 'en';
    const description = 'Thoughtful software with real-world purpose. Explore Book a Rifugio, STARE, Fluxa, Edge Track and CodTranslate, plus digital products, workflow automation and IoT integrations.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://www.bitladssoftware.com/');
    for (const property of ['og:title', 'twitter:title']) document.querySelector(`meta[property="${property}"]`)?.setAttribute('content', document.title);
    for (const property of ['og:description', 'twitter:description']) document.querySelector(`meta[property="${property}"]`)?.setAttribute('content', description);
    for (const property of ['og:url', 'twitter:url']) document.querySelector(`meta[property="${property}"]`)?.setAttribute('content', 'https://www.bitladssoftware.com/');
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', 'en_US');
  }, []);
  return (
    <div className="bitlads-home">
      <a className="home-skip" href="#main-content">Skip to content</a>
      <header className="home-header home-wrap">
        <Link className="home-brand" to="/" aria-label="Bitlads Software home">
          <svg className="home-brand-mark" viewBox="0 0 32 36" aria-hidden="true"><path d="M3 3h11v12H3zm15 0h11v12H18zM3 19h11v14H3zm15 0h11v14H18z" fill="currentColor" /></svg>
          <span>bitlads<span className="home-brand-sub">software</span></span>
        </Link>
        <button className="home-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="home-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav id="home-nav" className={menuOpen ? 'home-nav is-open' : 'home-nav'} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Our work</a>
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>What we do</a>
          <Link to="/blog">Journal</Link>
          <Link className="home-nav-contact" to="/contact">Let’s talk <ArrowUpRight size={17} /></Link>
        </nav>
      </header>
      <main id="main-content">
        <section className="home-hero home-wrap" aria-labelledby="home-title">
          <h1 id="home-title">Thoughtful software.<br /><span>Real-world purpose.</span></h1>
          <div className="home-hero-bottom">
            <a className="home-work-link" href="#work"><span className="home-arrow-disc"><ArrowDown size={23} /></span>Take a look at our work</a>
            <div className="home-hero-intro"><p>We build digital products, automate workflows and connect the physical world to software.</p><p>From the first idea to the details people use every day.</p></div>
          </div>
        </section>
        <section className="home-work home-wrap" id="work" aria-labelledby="work-title">
          <div className="home-section-heading"><h2 id="work-title">Work with a purpose.</h2><p>Products, practices and possibilities.</p></div>
          <div className="home-projects">
            {projects.map((project) => (
              <article className={`home-project home-project-${project.className}`} key={project.name}>
                <a href={project.url} className="home-project-image" target="_blank" rel="noopener noreferrer" aria-label={`${project.action} (opens in a new tab)`}>
                  <img src={project.image} alt={project.alt} loading="lazy" width="1280" height="720" />
                  <span className="home-image-arrow" aria-hidden="true"><ArrowUpRight size={24} /></span>
                </a>
                <div className="home-project-info">
                  <div className="home-project-top"><span>{project.category}</span><span className="home-status">{project.status}</span></div>
                  <h3>{project.name}</h3>
                  <p className="home-project-line">{project.description}</p>
                  <p className="home-project-detail">{project.detail}</p>
                  <div className="home-project-actions"><a className="home-text-link" href={project.url} target="_blank" rel="noopener noreferrer">{project.action}<ArrowUpRight size={18} /></a>{project.appStore && <a className="home-store-link" href={project.appStore} target="_blank" rel="noopener noreferrer">App Store <ArrowUpRight size={15} /></a>}</div>
                  {project.note && <p className="home-project-note">{project.note}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="home-capabilities" id="capabilities" aria-labelledby="capabilities-title">
          <div className="home-wrap home-capabilities-inner">
            <div className="home-capabilities-intro"><h2 id="capabilities-title">Different challenges.<br /><span>The same care.</span></h2><p>A useful product begins with understanding what needs to work. We bring that thinking to applications, everyday operations and connected devices.</p><Link className="home-text-link" to="/contact">Tell us what you’re working on <ArrowUpRight size={18} /></Link></div>
            <div className="home-services">
              <div className="home-service"><h3>Digital products</h3><p>Web and mobile applications built around a clear purpose, with considered interfaces and the systems behind them.</p><span>Web applications / Mobile apps / Product development</span></div>
              <div className="home-service"><h3>Workflow automation</h3><p>Connect your tools and remove repetitive steps. From moving information between systems to turning a manual process into a dependable workflow.</p><span>API integrations / Business processes / Internal tools</span></div>
              <div className="home-service"><h3>IoT & sensor integration</h3><p>Bring physical measurements into software. Connect devices, organise their data and make readings useful through dashboards and alerts.</p><span>Sensor data / Monitoring interfaces / Connected systems</span></div>
            </div>
          </div>
        </section>
        <section className="home-contact home-wrap" aria-labelledby="contact-title"><h2 id="contact-title">What could we<br /><em>build together?</em></h2><div><p>A product to bring to life.<br />A process that could work better.<br />A new connection to make.</p><Link className="home-contact-button" to="/contact">Start a conversation <ArrowRight size={20} /></Link></div></section>
      </main>
      <footer className="home-footer home-wrap"><Link className="home-footer-brand" to="/">Bitlads Software</Link><p>Software with a purpose.</p><nav aria-label="Footer navigation"><Link to="/blog">Journal</Link><Link to="/contact">Contact</Link></nav><span>© {new Date().getFullYear()} Bitlads Software</span></footer>
    </div>
  );
}
