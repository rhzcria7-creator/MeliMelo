import { motion } from 'framer-motion';
import { CHARACTERS } from '../data/personagens';

export default function Personagens() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="font-display font-bold text-6xl md:text-7xl text-meli-dark mb-6">Explore a <span className="text-meli-orange">Turma</span></h1>
          <p className="font-sans text-2xl text-gray-500 font-medium max-w-2xl mx-auto">
            Conheça todos os nossos amigos mágicos. Cada um tem um talento especial e muita alegria para compartilhar!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CHARACTERS.map((char, index) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer perspective-1000"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-[40px] p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/50 h-full relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] group-hover:border-white">
                
                {/* Visualizer Backdrop */}
                <div className={`absolute top-0 right-0 w-full h-full ${char.color} opacity-5 group-hover:opacity-10 transition-opacity duration-700 ease-in-out`} />
                
                {/* Character Image Placeholder */}
                <div className={`w-full aspect-square rounded-[32px] ${char.color} shadow-inner mb-8 relative flex items-end justify-center overflow-hidden transition-all duration-500`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full h-full p-4 relative z-20 flex items-center justify-center pointer-events-none"
                  >
                    <img 
                      src={char.image} 
                      alt={char.name} 
                      className="w-full h-full object-contain drop-shadow-2xl filter hover:brightness-110 transition-all"
                    />
                  </motion.div>
                </div>

                <div className="relative z-30">
                  <div className="bg-gray-100/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-sans font-bold text-gray-500 uppercase tracking-widest inline-block mb-3">
                    {char.role}
                  </div>
                  <h3 className="font-display font-bold text-3xl text-meli-dark mb-3 group-hover:text-meli-pink transition-colors">
                    {char.name}
                  </h3>
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
