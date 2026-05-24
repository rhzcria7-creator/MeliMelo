import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Loader2, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Contato() {
  const [formType, setFormType] = useState<'contato' | 'parceria'>('contato');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', email: '', message: '', company: '', instagram: '', type: 'Patrocínio', _honeypot: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = formType === 'contato' ? '/api/contact' : '/api/partnership';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (data.success && data.redirectUrl) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = data.redirectUrl;
          setLoading(false);
          setSuccess(false);
          setFormData({ name: '', email: '', message: '', company: '', instagram: '', type: 'Patrocínio', _honeypot: '' });
        }, 2000);
      } else {
        setLoading(false);
        alert('Ocorreu um erro ao enviar. Tente novamente mais tarde.');
      }
    } catch (err) {
      setLoading(false);
      alert('Erro de conexão com o servidor mágico.');
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFB347]/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-5/12"
          >
            <h1 className="text-[60px] leading-[1] font-black tracking-tighter text-meli-dark mb-6">Mande um <span className="text-[#FFB347] italic">Oi!</span></h1>
            <p className="font-bold text-xl text-gray-500 mb-12">
              Dúvidas, parcerias ou apenas para dizer o quanto seu pequeno ama a Meli? Escreva para nós!
            </p>

            <div className="flex flex-col gap-6">
              <ContactMethod icon={Mail} title="Email" detail="melimelo.oficial@outlook.com" color="text-[#7EC8E3]" />
              <ContactMethod icon={MapPin} title="Estúdio Mágico" detail="Nuvens de Algodão, 123" color="text-[#81C784]" />
            </div>
            
            <div className="mt-12">
              <h4 className="font-black text-xl text-meli-dark mb-4">Escolha o assunto:</h4>
              <div className="flex gap-4">
                <button 
                  onClick={() => setFormType('contato')}
                  className={cn("px-6 py-3 rounded-full font-black transition-all", formType === 'contato' ? "bg-meli-dark text-white shadow-xl" : "bg-white/50 text-gray-500 hover:bg-white")}
                >
                  Geral
                </button>
                <button 
                  onClick={() => setFormType('parceria')}
                  className={cn("px-6 py-3 rounded-full font-black transition-all flex items-center gap-2", formType === 'parceria' ? "bg-[#FF6B8A] text-white shadow-xl shadow-pink-200" : "bg-white/50 text-gray-500 hover:bg-white")}
                >
                  <MessageCircle size={18} /> Parcerias
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-7/12"
          >
            <form className="glass rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden" onSubmit={handleSubmit}>
              
              <AnimatePresence>
                {success && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-8 text-center rounded-[40px]"
                  >
                    <CheckCircle2 size={80} className="text-[#81C784] mb-6" />
                    <h3 className="font-black text-3xl text-meli-dark mb-4">Tudo Certo!</h3>
                    <p className="font-bold text-gray-500 text-lg">
                      Salvando na nuvem mágica e abrindo seu provedor de email favorito...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Honeypot field for anti-spam */}
              <input 
                type="text" 
                name="_honeypot" 
                style={{ display: 'none' }} 
                tabIndex={-1} 
                autoComplete="off"
                onChange={e => setFormData({...formData, _honeypot: e.target.value})}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-[10px] uppercase tracking-widest text-gray-400 ml-2">Como podemos te chamar?</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="Seu nome" className="w-full px-6 py-4 rounded-2xl bg-white/50 border-2 border-white focus:outline-none focus:border-[#FFB347] focus:bg-white transition-all font-bold placeholder:font-bold placeholder:text-gray-300" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-[10px] uppercase tracking-widest text-gray-400 ml-2">Qual seu melhor email?</label>
                  <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="seu@email.com" className="w-full px-6 py-4 rounded-2xl bg-white/50 border-2 border-white focus:outline-none focus:border-[#7EC8E3] focus:bg-white transition-all font-bold placeholder:font-bold placeholder:text-gray-300" />
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                {formType === 'parceria' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 overflow-hidden"
                  >
                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-[10px] uppercase tracking-widest text-gray-400 ml-2">Marca / Empresa</label>
                      <input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} type="text" placeholder="Ex: MeliMelo Studios" className="w-full px-6 py-4 rounded-2xl bg-white/50 border-2 border-white focus:outline-none focus:border-[#FF6B8A] focus:bg-white transition-all font-bold placeholder:font-bold placeholder:text-gray-300" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-bold text-[10px] uppercase tracking-widest text-gray-400 ml-2">Tipo de Parceria</label>
                      <div className="relative">
                        <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-white/50 border-2 border-white focus:outline-none focus:border-[#81C784] focus:bg-white transition-all font-bold appearance-none cursor-pointer">
                          <option>Patrocínio</option>
                          <option>Licenciamento</option>
                          <option>Eventos & Shows</option>
                          <option>Mídia & Imprensa</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-2 mb-8">
                <label className="font-bold text-[10px] uppercase tracking-widest text-gray-400 ml-2">{formType === 'parceria' ? 'Sua Proposta Mágica' : 'Sua Mensagem'}</label>
                <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={5} placeholder="Escreva aqui..." className="w-full px-6 py-4 rounded-2xl bg-white/50 border-2 border-white focus:outline-none focus:border-[#FFB347] focus:bg-white transition-all font-bold resize-none placeholder:font-bold placeholder:text-gray-300"></textarea>
              </div>

              <button disabled={loading} className="w-full py-5 rounded-2xl bg-[#FFB347] text-white font-black text-xl shadow-[0_15px_30px_rgba(255,179,71,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 flex justify-center items-center gap-2 border-b-4 border-orange-500 active:border-b-0 active:translate-y-1">
                {loading ? <><Loader2 className="animate-spin" /> Preparando encanto...</> : 'Enviar Mensagem Mágica'}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

function ContactMethod({ icon: Icon, title, detail, color }: any) {
  return (
    <div className="flex items-center gap-6 p-4 rounded-3xl glass border-2 border-white hover:bg-white transition-colors cursor-pointer group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-md ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <div>
        <h4 className="font-black text-xl text-meli-dark">{title}</h4>
        <p className="font-bold text-gray-500">{detail}</p>
      </div>
    </div>
  );
}
