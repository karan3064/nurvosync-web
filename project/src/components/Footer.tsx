import { Zap, Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                NurvoSync
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-md mb-4">
              Transforming everyday shoes into smart footwear through intelligent insoles
              and live web dashboards.
            </p>
            <p className="text-xs text-gray-500 italic">
              Not intended for medical use.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/demo" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 text-sm hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2024 NurvoSync. Founded by Karanjeet Singh & Yash Agarwal.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right">
              Smart Footwear Intelligence Platform
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
