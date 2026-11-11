import { Link } from 'react-router-dom';

const KARAN_WHATSAPP = 'https://wa.me/919873199799?text=Hi%20Karan%2C%20I%27m%20interested%20in%20NurvoSync';
const YASH_WHATSAPP = 'https://wa.me/917048960924?text=Hi%20Yash%2C%20I%27m%20interested%20in%20NurvoSync';
// TODO: fill in once available.
const COMPANY_LINKEDIN_URL = '';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 bg-signal flex-shrink-0" />
              <span className="text-xl font-serif font-medium text-paper tracking-tight">
                NurvoSync
              </span>
            </div>
            <p className="text-paper/60 text-sm max-w-md mb-4">
              A smart insole and ankle pod that measures plantar pressure and walking patterns
              continuously, so clinicians can follow rehabilitation, neuropathy and fall risk
              between visits.
            </p>
            <p className="text-xs text-paper/50 max-w-md">
              NurvoSync is a research prototype and is not yet a certified medical device.
            </p>
          </div>

          <div>
            <h3 className="spec-label text-paper/70 mb-3">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/experience" className="text-paper/60 text-sm hover:text-paper transition-colors">
                  Experience the Insole
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-paper/60 text-sm hover:text-paper transition-colors">
                  Live App
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-paper/60 text-sm hover:text-paper transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-paper/60 text-sm hover:text-paper transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-paper/60 text-sm hover:text-paper transition-colors">
                  Clinician portal (beta)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="spec-label text-paper/70 mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#contact" className="text-paper/60 text-sm hover:text-paper transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="mailto:kssingh2117@gmail.com" className="text-paper/60 text-sm hover:text-paper transition-colors">
                  Email
                </a>
              </li>
              <li>
                <a href={KARAN_WHATSAPP} target="_blank" rel="noreferrer" className="text-paper/60 text-sm hover:text-paper transition-colors">
                  WhatsApp — Karanjeet
                </a>
              </li>
              <li>
                <a href={YASH_WHATSAPP} target="_blank" rel="noreferrer" className="text-paper/60 text-sm hover:text-paper transition-colors">
                  WhatsApp — Yash
                </a>
              </li>
              {COMPANY_LINKEDIN_URL && (
                <li>
                  <a href={COMPANY_LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-paper/60 text-sm hover:text-paper transition-colors">
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-paper/15 space-y-2">
          <p className="text-paper/50 text-xs">
            NurvoSync is a product of NurvoExa Systems Private Limited · CIN U26100UW2026PTC257766 · DPIIT No. DIPP286151
          </p>
          <p className="text-paper/50 text-xs">
            Registered office: Noida, Uttar Pradesh
          </p>
          <p className="text-paper/40 text-xs">
            © {year} NurvoExa Systems Pvt. Ltd. NurvoSync is a research prototype and is not yet a certified medical device.
          </p>
          <p className="text-paper/30 text-[11px]">
            3D shoe model in the live app:{' '}
            <a href="https://poly.pizza/m/cs7k_ENAZjQ" target="_blank" rel="noreferrer" className="hover:text-paper/60 transition-colors">
              "Trainer" by jeremy
            </a>{' '}
            via Poly Pizza, licensed{' '}
            <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer" className="hover:text-paper/60 transition-colors">
              CC BY 3.0
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
