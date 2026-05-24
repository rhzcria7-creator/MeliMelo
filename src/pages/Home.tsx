import { motion } from 'framer-motion';
import { Play, Sparkles, Star, Heart, Music as MusicIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

export default function Home() {
  return (
    <div className="w-full flex-1">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        {/* Animated Background Layers are now centralized in ParticleBackground */}

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
          
          <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
            {/* Left Character (Meli) */}
            <motion.div 
              initial={{ x: -100, opacity: 0, rotate: -10 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="absolute -left-12 lg:-left-32 top-10 md:-top-10 w-48 lg:w-64 z-20 pointer-events-none hidden md:block"
            >
              <img src="/assets/personagens/meli.png" alt="Meli" className="w-full h-auto drop-shadow-2xl" />
            </motion.div>

            {/* Right Character (Melo) */}
            <motion.div 
              initial={{ x: 100, opacity: 0, rotate: 10 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="absolute -right-12 lg:-right-32 top-20 md:top-0 w-48 lg:w-64 z-20 pointer-events-none hidden md:block"
            >
              <img src="/assets/personagens/melo.png" alt="Melo" className="w-full h-auto drop-shadow-2xl" />
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="inline-flex flex-col items-center justify-center mb-8"
            >
              <div className="glass px-6 py-2 rounded-full flex items-center gap-2 mb-6 transform rotate-[-2deg] font-baloo text-meli-pink font-semibold">
                <Sparkles size={18} />
                <span>Magia e Diversão Todo Dia!</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <img src="/assets/personagens/logo.png" alt="MeliMelo Logo" className="w-full max-w-[600px] h-auto drop-shadow-2xl mx-auto" />
            </motion.div>

            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="font-sans text-xl md:text-3xl text-gray-600 max-w-3xl mb-12 font-medium"
            >
              Um universo incrível de personagens, músicas e aventuras que transformam a imaginação em realidade.
            </motion.p>
          </div>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <Link to="/musicas" className="bg-[#FFB347] text-white px-10 py-5 rounded-3xl font-black text-xl shadow-[0_15px_30px_rgba(255,179,71,0.4)] transform hover:scale-105 transition-all active:border-b-0 active:translate-y-1">
              Ouvir Agora
            </Link>

            <Link to="/personagens" className="glass px-10 py-5 rounded-3xl font-black text-xl text-meli-dark shadow-xl hover:shadow-2xl transition-all border-b-4 border-white/50 active:border-b-0 active:translate-y-1">
              Conhecer a Turma
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Featured Characters Teaser */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-display font-bold text-5xl md:text-6xl text-meli-dark mb-4">Nossa Turminha</h2>
            <p className="font-sans text-xl text-gray-500 font-medium">Os amigos que fazem a magia acontecer diariamente</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pl-4 pr-4">
            <FeatureCard title="Meli" color="bg-meli-orange" image="/assets/personagens/meli.png" delay={0.1} />
            <FeatureCard title="Melo" color="bg-meli-blue" image="/assets/personagens/melo.png" delay={0.2} translateY={24} />
            <FeatureCard title="Bibi" color="bg-meli-pink" image="/assets/personagens/bibi.png" delay={0.3} />
          </div>
          
          <div className="text-center mt-20">
            <Link to="/personagens" className="inline-flex items-center gap-2 font-baloo text-xl font-bold text-meli-pink hover:text-meli-orange transition-colors">
              Ver todos os personagens <Sparkles size={20} />
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}


function FeatureCard({ title, color, image, delay, translateY = 0 }: { title: string, color: string, image?: string, delay: number, translateY?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 + translateY }}
      whileInView={{ opacity: 1, y: translateY }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: translateY - 10, scale: 1.02 }}
      className="group relative"
    >
      <div className={`aspect-[4/5] rounded-[40px] ${color} p-1 shadow-xl overflow-hidden relative`}>
        {/* Inner Glass Box */}
        <div className="absolute inset-2 rounded-[32px] border-2 border-white/20 bg-white/10 backdrop-blur-md z-10 p-8 flex flex-col justify-end overflow-hidden">
          {/* Character Image */}
          {image && (
            <motion.div 
              className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src={image} 
                alt={title} 
                className="w-full h-[90%] object-contain object-bottom drop-shadow-2xl" 
              />
            </motion.div>
          )}

          <div className="relative z-10 w-full">
            <h3 className="font-display font-bold text-4xl text-white drop-shadow-md mb-2">{title}</h3>
            <div className="w-12 h-2 bg-white/50 rounded-full group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
