import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Instant Deployments',
    description: 'Push to git and your website is live. Zero configuration required.',
    color: 'bg-indigo-50',
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Global Edge Network',
    description: 'Your content is delivered from the edge, closest to your users.',
    color: 'bg-purple-50',
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time insights into your application performance and visitor stats.',
    color: 'bg-pink-50',
    icon: (
      <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Automatic SSL',
    description: 'Every deployment automatically gets a free SSL certificate.',
    color: 'bg-blue-50',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Setup
      const cards = gsap.utils.toArray<HTMLElement>(".feature-card");
      
      // Initial positioning: All cards (except first) are pushed down and faded out
      gsap.set(cards, { 
        y: (i) => i * 0, // Start at same position visually, but we will animate them in
        zIndex: (i) => i,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`, // Scroll duration proportional to card count
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Animate cards
      cards.forEach((card, i) => {
        if (i === 0) return; // First card is already there

        tl.fromTo(card, 
          { 
            y: "120%", 
            scale: 0.8,
            rotationX: -20,
            opacity: 0 
          },
          { 
            y: "0%", 
            scale: 1, 
            rotationX: 0,
            opacity: 1, 
            duration: 1,
            ease: "power2.out"
          }
        );

        // Optional: Animate previous card out slightly for depth
        tl.to(cards[i-1], {
          scale: 0.9,
          filter: "blur(5px)",
          opacity: 0.5,
          duration: 1,
        }, "<"); // Happen at same time as next card enters
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-slate-900 text-white h-screen flex flex-col items-center justify-center overflow-hidden">
      <div ref={headerRef} className="absolute top-20 text-center z-10 w-full px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Powerful Features
        </h2>
        <p className="text-slate-400">
          Scroll to explore
        </p>
      </div>

      <div className="relative w-full max-w-md h-[450px] perspective-1000 mt-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card absolute top-0 left-0 w-full h-full p-8 rounded-3xl border border-slate-200/20 shadow-2xl flex flex-col justify-center items-center text-center ${feature.color} backdrop-blur-md`}
              style={{ 
                // We use transform-style preserve-3d for better rotation effects
                transformStyle: "preserve-3d" 
              }} 
            >
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-xl">
                {feature.icon}
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-4">{feature.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">{feature.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Features;
