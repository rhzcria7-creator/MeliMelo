import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center relative overflow-hidden">
      
      {/* Decorative stars/clouds */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-meli-blue/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-meli-pink/20 rounded-full blur-3xl" />

      <div className="max-w-xl mx-auto px-6 text-center relative z-10">
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="font-display font-extrabold text-[150px] leading-none text-transparent bg-clip-text bg-gradient-to-tr from-meli-orange to-meli-pink mb-4"
        >
          404
        </motion.h1>
        
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-display font-bold text-4xl text-meli-dark mb-4"
        >
          Ops! Parecemos perdidos...
        </motion.h2>
        
        <motion.p 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="font-sans text-xl text-gray-500 font-medium mb-12"
        >
          A página que você está procurando deve estar brincando de esconde-esconde. Que tal voltarmos para casa?
        </motion.p>
        
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
        >
          <Link to="/" className="inline-flex items-center gap-3 px-8 py-5 rounded-[32px] bg-meli-dark text-white font-baloo text-xl font-bold hover:scale-105 transition-transform shadow-xl">
            <Home size={24} />
            Voltar para o Início
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
