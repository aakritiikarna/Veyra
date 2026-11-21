const footerGroups = [
  {
    title: 'Explore',
    links: [
      { label: 'New Arrivals', href: '#new-arrivals' },
      { label: 'Best Sellers', href: '#best-sellers' },
      { label: 'Collections', href: '#collections' },
      { label: 'Our point of view', href: '#home' },
    ],
  },
  {
    title: 'Customer Support',
    links: [
      { label: 'Contact' },
      { label: 'Delivery & returns' },
      { label: 'Care guide' },
      { label: 'FAQs' },
    ],
  },
  {
    title: 'Follow along',
    links: [
      { label: 'Instagram' },
      { label: 'Pinterest' },
      { label: 'TikTok' },
    ],
  },
];

function FooterLink({ link }) {
  if (link.href) return <a href={link.href}>{link.label}</a>;
  return (
    <span className="footer-link-disabled" aria-disabled="true">
      {link.label}<small>Coming soon</small>
    </span>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="page-shell">
        <div className="footer-main">
          <div className="footer-brand-block">
            <a href="#home" className="brand-lockup brand-lockup--footer" aria-label="VEYRA home">
              <span className="footer-brand-mark">V.</span><span>VEYRA</span>
            </a>
            <p className="footer-overline">About VEYRA</p>
            <p>Considered footwear for the everyday. An invitation to move through the familiar a little differently.</p>
            <span className="footer-contact footer-contact--unavailable" aria-disabled="true">Contact details coming soon</span>
          </div>
          {footerGroups.map((group) => (
            <div className="footer-link-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map((link) => <FooterLink key={link.label} link={link} />)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 VEYRA. Step beyond ordinary.</span>
          <div>
            <span className="footer-legal-unavailable" aria-disabled="true">Privacy Policy <small>Coming soon</small></span>
            <span className="footer-legal-unavailable" aria-disabled="true">Terms and Conditions <small>Coming soon</small></span>
          </div>
          <a href="#home" className="back-to-top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
