const FooterHome = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="container px-4 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">
                AM
              </div>
              <span className="text-lg font-semibold text-white">
                Auto-Mate
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm text-blue-200">
              Auto-Mate is a demo project showcasing how AI-powered Instagram
              automation can help creators grow engagement efficiently.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-blue-200">
              <li>
                <a href="#features" className="hover:text-blue-400">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-400">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-white">
              Project Info
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-blue-200">
              <li>College Term Work Project</li>
              <li>Built with Next.js & Tailwind</li>
              <li>AI Concepts Demonstration</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-blue-300">
          © {new Date().getFullYear()} Auto-Mate. All rights reserved.
          <span className="block mt-1">
            This project is for educational purposes only.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default FooterHome