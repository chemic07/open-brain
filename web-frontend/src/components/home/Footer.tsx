import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative bg-[#05070A] border-t border-white/10 overflow-hidden">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-radial-[ellipse_at_center] from-blue-500/10 via-transparent to-transparent blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 py-16">
        {/* top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-semibold">Open Brain</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your second brain for saving, organizing, and discovering
              knowledge with AI-powered search.
            </p>

            <div className="flex items-center gap-4 text-gray-400">
              <a href="#" className="hover:text-white transition">
                <FiGithub />
              </a>
              <a href="#" className="hover:text-white transition">
                <FiTwitter />
              </a>
              <a href="#" className="hover:text-white transition">
                <FiLinkedin />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition">
                Features
              </li>
              <li className="hover:text-white cursor-pointer transition">
                AI Search
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Sharing
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Roadmap
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition">
                Blog
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Documentation
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Community
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Support
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition">
                Privacy Policy
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Terms of Service
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Cookie Policy
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Open Brain. All rights reserved.</p>
          <p>Built with ❤️ for curious minds.</p>
        </div>
      </div>
    </footer>
  );
}
