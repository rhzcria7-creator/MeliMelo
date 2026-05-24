import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Music, Users, Home, Info, Mail } from 'lucide-react';
import { cn } from '../lib/utils';

const links = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Personagens', path: '/personagens', icon: Users },
  { name: 'Músicas', path: '/musicas', icon: Music },
  { name: 'Sobre', path: '/sobre', icon: Info },
  { name: 'Contato', path: '/contato', icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'py-3' : 'py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className={cn(
            'flex items-center justify-between rounded-full transition-all duration-500',
            scrolled ? 'glass px-6 py-2' : 'bg-transparent px-2'
          )}>
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/assets/personagens/logo.png" 
                  alt="MeliMelo Logo" 
                  className="h-full object-contain drop-shadow-sm"
                  onError={(e) => {
                    // Fallback to text if image not loaded
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className={cn(
                  "hidden font-display font-bold text-2xl tracking-tight transition-colors",
                  scrolled ? "text-meli-dark" : "text-meli-dark drop-shadow-sm"
                )}>
                  MeliMelo
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative px-4 py-2 rounded-full font-sans text-sm font-bold overflow-hidden group"
                  >
                    <span className={cn(
                      "relative z-10 transition-colors duration-300",
                      isActive ? "text-meli-pink" : "text-gray-400 hover:text-meli-pink"
                    )}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-white/50 backdrop-blur-md rounded-full -z-0 border border-white/60 shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-meli-dark shadow-sm"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] glass-premium flex flex-col pt-24 px-6 pb-12"
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white text-meli-dark shadow-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col gap-4 mt-8 flex-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-4 p-4 rounded-3xl bg-white/50 border border-white/50 text-2xl font-baloo font-semibold text-meli-dark active:scale-95 transition-transform"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-meli-blue/20 to-meli-pink/20 flex items-center justify-center text-meli-pink">
                      <link.icon size={24} />
                    </div>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
