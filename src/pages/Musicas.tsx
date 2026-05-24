import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music, Heart, Clock, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

const tracks = [
  { id: 1, title: 'BZZZ BOM DIA!', time: '2:34', color: 'bg-[#FFB347]', released: true },
  { id: 2, title: 'Cores do Arco-Íris', time: '--:--', color: 'bg-[#7EC8E3]', released: false },
  { id: 3, title: 'Conta Comigo', time: '--:--', color: 'bg-[#FF6B8A]', released: false },
  { id: 4, title: 'Som dos Animais', time: '--:--', color: 'bg-[#81C784]', released: false },
  { id: 5, title: 'Hora de Dormir', time: '--:--', color: 'bg-[#B39DFF]', released: false },
  { id: 6, title: 'Amigo é Pra Sempre', time: '--:--', color: 'bg-[#FF9DE2]', released: false },
];

export default function Musicas() {
  const [playing, setPlaying] = useState<number | null>(null);

  const togglePlay = (track: any) => {
    if (!track.released) return;
    setPlaying(playing === track.id ? null : track.id);
  };

  const currentTrack = tracks.find(t => t.id === playing);

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFB347]/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7EC8E3]/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Main Player */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 sticky top-32"
          >
            <div className="flex gap-3 mb-4">
               <span className="bg-[#FF6B8A]/10 text-[#FF6B8A] font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">Trilha Sonora Oficial</span>
            </div>
            <h1 className="text-[60px] leading-[1] font-black tracking-tighter text-meli-dark mb-6">Nossas <span className="text-[#7EC8E3] italic">Músicas</span></h1>
            <p className="text-xl text-gray-500 font-bold mb-12">
              Selecione uma faixa e deixe a magia tomar conta da sua casa.
            </p>

            {/* Now Playing Widget */}
            <div className="glass rounded-[40px] p-8 shadow-2xl relative overflow-hidden transform hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7EC8E3]/20 blur-[60px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF6B8A]/20 blur-[60px] rounded-full" />
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentTrack?.id || 'empty'}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className={`aspect-square ${currentTrack ? currentTrack.color : 'bg-gradient-to-tr from-[#7EC8E3] to-[#FF6B8A]'} rounded-[32px] mb-8 shadow-lg flex items-center justify-center relative overflow-hidden group`}
                >
                  <Music size={64} className="text-white/50" />
                  
                  {playing && (
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/20 backdrop-blur-sm">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ height: ['20%', '90%', '20%'] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                          className="w-3 bg-white rounded-full"
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="text-center relative z-10">
                <h3 className="font-black text-3xl text-meli-dark mb-2">
                  {playing ? currentTrack?.title : 'Selecione uma música'}
                </h3>
                <p className="font-bold text-gray-400 mb-8 tracking-widest uppercase text-xs">MeliMelo Original</p>
                
                <div className="flex items-center justify-center gap-6">
                  <button className="w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF6B8A] transition-colors hover:bg-white/50">
                    <Heart size={24} />
                  </button>
                  <button 
                    onClick={() => currentTrack && togglePlay(currentTrack)}
                    disabled={!currentTrack?.released}
                    className="w-20 h-20 rounded-full bg-[#3D3D3D] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {playing ? <Pause size={32} /> : <Play size={32} className="ml-2" />}
                  </button>
                  <button className="w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-[#7EC8E3] transition-colors hover:bg-white/50">
                    <Music size={24} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Playlist */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 pt-8"
          >
            <div className="flex flex-col gap-4">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "bg-white/80 backdrop-blur-md rounded-3xl p-4 flex items-center gap-6 cursor-pointer transition-all duration-300 border-2 hover:shadow-xl",
                    playing === track.id ? "border-[#FF6B8A] shadow-md bg-white scale-[1.02]" : "border-white shadow-sm hover:border-gray-100 hover:bg-white",
                    !track.released && "opacity-75 hover:opacity-100 cursor-not-allowed"
                  )}
                  onClick={() => togglePlay(track)}
                >
                  <div className={cn(
                    "relative w-16 h-16 rounded-2xl flex items-center justify-center text-white transition-transform duration-300",
                    track.color,
                    playing === track.id ? "scale-105" : "",
                    !track.released && "opacity-80"
                  )}>
                    {!track.released ? <Lock size={20} /> : (playing === track.id ? <Pause size={24} /> : <Play size={24} className="ml-1" />)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-black text-xl text-meli-dark truncate">{track.title}</h4>
                      {!track.released && (
                        <span className="shrink-0 bg-gray-100 text-gray-500 text-[10px] uppercase font-bold px-2 py-1 rounded-full whitespace-nowrap">Em breve</span>
                      )}
                    </div>
                    <p className="font-bold text-gray-400 text-xs uppercase tracking-wider truncate">MeliMelo Álbum 1</p>
                  </div>
                  
                  <div className="font-bold text-gray-300 px-4 flex items-center gap-2">
                    {track.time}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 p-8 glass rounded-[40px] relative overflow-hidden">
              <div className="absolute -inset-10 bg-gradient-to-br from-[#FFF9F0] to-[#FFE0E6] opacity-50 blur-2xl -z-10" />
              <h3 className="font-black text-2xl text-meli-dark mb-4">Também no Spotify e Apple Music</h3>
              <p className="font-bold text-gray-500 mb-6 max-w-sm">Ouça nossas músicas completas em todas as plataformas digitais oficiais.</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-black text-white font-black rounded-full hover:scale-105 shadow-xl transition-all hover:shadow-2xl">
                  Spotify
                </button>
                <button className="px-8 py-4 bg-[#FA243C] text-white font-black rounded-full hover:scale-105 shadow-xl transition-all hover:shadow-2xl">
                  Apple Music
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
