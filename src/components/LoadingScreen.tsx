import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can replace this with actual asset preloading logic)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-meli-cream"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-meli-orange/10 to-meli-pink/10" />
          
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
          >
            <img 
              src="/assets/personagens/logo.png" 
              alt="Carregando MeliMelo..." 
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-12 font-sans font-bold text-meli-dark text-lg flex items-center gap-2"
          >
            <div className="w-5 h-5 border-4 border-meli-pink border-t-transparent rounded-full animate-spin" />
            Preparando a magia...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
