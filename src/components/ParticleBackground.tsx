import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create animated gradient background layer
    const bgLayer = document.createElement('div');
    bgLayer.className = 'absolute inset-0 bg-gradient-to-br from-[#FFF9F0] via-[#FFFEFA] to-[#FFF5E6] -z-20';
    container.appendChild(bgLayer);

    // Create noise texture overlay for premium feel
    const noiseLayer = document.createElement('div');
    noiseLayer.className = 'absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay -z-10 bg-repeat';
    noiseLayer.style.backgroundImage = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;
    container.appendChild(noiseLayer);

    const colors = ['#FFB347', '#FF6B8A', '#7EC8E3', '#81C784', '#FFF'];
    const particleCount = 40; // Increased count
    
    // Fragment to batch DOM insertions
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      const isStar = Math.random() > 0.7; // 30% are tiny stars/glitters
      const size = isStar ? Math.random() * 4 + 2 : Math.random() * 15 + 10;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 30 + 15; // Slowed down significantly for elegance
      const delay = Math.random() * 5;
      const color = isStar ? '#FFF' : colors[Math.floor(Math.random() * (colors.length - 1))];
      
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = color;
      particle.style.borderRadius = '50%';
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      
      if (isStar) {
        particle.style.opacity = `${Math.random() * 0.8 + 0.2}`;
        particle.style.boxShadow = '0 0 8px 2px rgba(255,255,255,0.4)';
        // Pulsating star animation
        particle.animate([
          { opacity: 0.1, transform: 'scale(0.8)' },
          { opacity: 1, transform: 'scale(1.2)' },
          { opacity: 0.1, transform: 'scale(0.8)' }
        ], {
          duration: Math.random() * 3000 + 2000,
          delay: delay * 1000,
          iterations: Infinity,
          direction: 'alternate',
          easing: 'ease-in-out'
        });
      } else {
        particle.style.opacity = `${Math.random() * 0.15 + 0.05}`; // Very subtle
        particle.style.filter = `blur(${size / 3}px)`;
        // Slow floating animation
        particle.animate([
          { transform: 'translate(0, 0) rotate(0deg)' },
          { transform: `translate(${Math.random() * 100 - 50}px, ${-(Math.random() * 200 + 100)}px) rotate(${Math.random() * 360}deg)` }
        ], {
          duration: duration * 1000,
          delay: delay * 1000,
          iterations: Infinity,
          direction: 'alternate',
          easing: 'ease-in-out'
        });
      }
      
      particle.style.willChange = 'transform, opacity'; // GPU acceleration hint
      fragment.appendChild(particle);
    }
    
    container.appendChild(fragment);

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      aria-hidden="true"
    />
  );
}
