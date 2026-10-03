import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { SEOHead } from '../components/SEOHead';
import './contact.css';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <SEOHead
        title="Contact Bitlads Software | Digital Products, Automation & IoT"
        description="Tell Bitlads Software about a digital product, automation workflow, or connected sensor project."
        keywords="Bitlads Software contact, digital product development, workflow automation, IoT sensors"
        canonical="https://www.bitladssoftware.com/contact"
      />

      <header className="contact-header">
        <Link to="/" className="contact-brand" aria-label="Bitlads Software home">
          <svg className="contact-brand-mark" viewBox="0 0 32 36" aria-hidden="true"><path d="M3 3h11v12H3zm15 0h11v12H18zM3 19h11v14H3zm15 0h11v14H18z" fill="currentColor" /></svg>
          <span>bitlads<span className="contact-brand-muted">software</span></span>
        </Link>
        <Link to="/" className="contact-back"><ArrowLeft size={16} /> Back to work</Link>
      </header>

      <main className="contact-main">
        <div className="contact-intro">
          <p className="contact-kicker">Start a conversation / 01</p>
          <h1>Let’s make<br /><em>something useful.</em></h1>
          <p className="contact-lede">Have a product in mind, a workflow that needs untangling, or a sensor use case to explore? Tell us what you’re working on.</p>
          <div className="contact-details">
            <span>Prefer email?</span>
            <a href="mailto:contact@bitladssoftware.com">contact@bitladssoftware.com <ArrowUpRight size={15} /></a>
          </div>
        </div>

        <div className="contact-form-shell">
          <div className="contact-form-heading">
            <span>Project inquiry</span>
            <span>Bitlads Software</span>
          </div>
          <ContactForm />
        </div>
      </main>

      <footer className="contact-footer">
        <span>© {new Date().getFullYear()} Bitlads Software</span>
        <span>Bagawhey Solutions S.R.L.</span>
      </footer>
    </div>
  );
}
