import { motion } from 'motion/react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold tracking-tighter mb-4">Brand.</h3>
            <p className="text-slate-400 max-w-sm">
              Making deployment easy, fast, and secure for developers worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Brand Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <motion.a
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="#"
              className="hover:text-white transition-colors"
            >
              Twitter
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="#"
              className="hover:text-white transition-colors"
            >
              GitHub
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, color: '#fff' }}
              href="#"
              className="hover:text-white transition-colors"
            >
              Discord
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

