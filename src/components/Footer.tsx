import { Link } from 'react-router-dom';
import { Youtube, Instagram, Music } from 'lucide-react'; // Simulating TikTok with Music

export default function Footer() {
  return (
    <footer className="relative mt-24 pt-32 pb-12 overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 w-full h-24 bg-gradient-to-b from-transparent to-meli-cream/50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group inline-flex h-16">
              <img 
                src="/assets/personagens/logo.png" 
                alt="MeliMelo Logo" 
                className="w-auto h-full object-contain filter group-hover:drop-shadow-[0_0_15px_rgba(255,179,71,0.5)] transition-all duration-300"
              />
            </Link>
            <p className="font-sans text-gray-600 text-lg leading-relaxed max-w-sm">
              Um universo mágico projetado para inspirar imaginação, sorrisos e momentos inesquecíveis em família.
            </p>
          </div>
          
          <div>
            <h4 className="font-baloo font-bold text-xl text-meli-dark mb-6">Explore</h4>
            <ul className="space-y-4 font-sans font-medium text-gray-500">
              <li><Link to="/personagens" className="hover:text-meli-pink transition-colors">Personagens</Link></li>
              <li><Link to="/musicas" className="hover:text-meli-blue transition-colors">Músicas e Clipes</Link></li>
              <li><Link to="/sobre" className="hover:text-meli-orange transition-colors">Nossa Missão</Link></li>
              <li><Link to="/loja" className="hover:text-meli-green transition-colors">Loja Oficial</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-baloo font-bold text-xl text-meli-dark mb-6">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-[#FF0000] hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                <Youtube size={24} strokeWidth={2.5} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-[#E1306C] hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                <Instagram size={24} strokeWidth={2.5} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass-premium flex items-center justify-center text-black hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                <Music size={24} strokeWidth={2.5} />
              </a>
            </div>
            <p className="mt-6 font-sans text-sm text-gray-400">
              Acompanhe as novidades e lançamentos.
            </p>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-gray-400 font-medium">
            © {new Date().getFullYear()} MeliMelo Studios. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 font-sans text-sm text-gray-400 font-medium">
            <Link to="/termos" className="hover:text-meli-dark transition-colors">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-meli-dark transition-colors">Privacidade</Link>
          </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-meli-orange/5 to-transparent -z-10" />
    </footer>
  );
}
