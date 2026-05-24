import { motion } from 'framer-motion';
import { Heart, Star, Sparkles, Smile } from 'lucide-react';

export default function Sobre() {
  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      {/* Decorative characters */}
      <motion.div 
        initial={{ x: -100, opacity: 0, rotate: -5 }}
        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
        className="absolute left-[-5%] top-[20%] w-64 lg:w-96 z-10 pointer-events-none hidden md:block opacity-50 blur-[2px] transition-all hover:blur-none hover:opacity-100"
      >
        <img src="/assets/personagens/mama-bee.png" alt="Mama Bee" className="w-full h-auto drop-shadow-2xl" />
      </motion.div>

      <motion.div 
        initial={{ x: 100, opacity: 0, rotate: 5 }}
        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 60, delay: 0.4 }}
        className="absolute right-[-5%] bottom-[10%] w-64 lg:w-96 z-10 pointer-events-none hidden md:block opacity-50 blur-[2px] transition-all hover:blur-none hover:opacity-100"
      >
        <img src="/assets/personagens/papa-bee.png" alt="Papa Bee" className="w-full h-auto drop-shadow-2xl" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-5xl md:text-7xl text-meli-dark mb-8"
        >
          Criando <span className="text-meli-green">Magia</span> Todo Dia
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-sans text-xl md:text-2xl text-gray-500 font-medium leading-relaxed mb-16"
        >
          MeliMelo nasceu do sonho de criar um universo seguro, educativo e extremamente divertido 
          para as crianças da nova geração.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-20">
          <InfoCard 
            icon={Heart} 
            color="text-meli-pink bg-meli-pink/10 border-meli-pink/20"
            title="Feito com Amor" 
            desc="Cada animação, música e personagem é desenhado pensando no sorriso de uma criança."
            delay={0.2}
          />
          <InfoCard 
            icon={Star} 
            color="text-meli-orange bg-meli-orange/10 border-meli-orange/20"
            title="Seguro & Educativo" 
            desc="Conteúdo revisado por pedagogos para garantir aprendizado e segurança total."
            delay={0.3}
          />
          <InfoCard 
            icon={Sparkles} 
            color="text-meli-blue bg-meli-blue/10 border-meli-blue/20"
            title="Premium" 
            desc="Qualidade cinematográfica em cada pixel, comparável aos maiores estúdios do mundo."
            delay={0.4}
          />
          <InfoCard 
            icon={Smile} 
            color="text-meli-green bg-meli-green/10 border-meli-green/20"
            title="Para a Família" 
            desc="Músicas que os pais também vão amar ouvir (e não vão conseguir tirar da cabeça!)."
            delay={0.5}
          />
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="glass-premium rounded-[40px] p-12 relative overflow-hidden"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-meli-blue via-meli-pink to-meli-orange opacity-20 blur-2xl" />
          <h2 className="font-display font-bold text-4xl text-meli-dark mb-6 relative z-10">Nossa Missão</h2>
          <p className="font-sans text-xl text-gray-600 leading-relaxed font-medium relative z-10">
            Acreditamos que a primeira infância é o momento mais mágico da vida. 
            Nossa missão é fornecer a trilha sonora e os amigos perfeitos para essa jornada, 
            criando memórias que durarão para sempre.
          </p>
        </motion.div>

      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, color, title, desc, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`p-8 rounded-[32px] border ${color} bg-white`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white shadow-sm text-current`}>
        <Icon size={28} />
      </div>
      <h3 className="font-display font-bold text-2xl text-meli-dark mb-3">{title}</h3>
      <p className="font-sans text-gray-600 font-medium">{desc}</p>
    </motion.div>
  );
}
