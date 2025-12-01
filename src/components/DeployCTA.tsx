import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';

const DeployCTA = () => {
  const [status, setStatus] = useState<'idle' | 'building' | 'complete'>('idle');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const checkmarkRef = useRef<SVGPathElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const startDeploy = () => {
    if (status !== 'idle') return;
    setStatus('building');
  };

  useEffect(() => {
    if (status === 'building') {
      const ctx = gsap.context(() => {
        // 1. Terminal Lines Animation
        const lines = terminalRef.current?.querySelectorAll('.terminal-line');
        if (lines) {
          gsap.fromTo(lines,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, stagger: 0.5, duration: 0.3 }
          );
        }

        // 2. Progress Bar
        gsap.to(progressBarRef.current, {
          width: '100%',
          duration: 3,
          ease: "power1.inOut",
          onComplete: () => setStatus('complete')
        });
      });
      return () => ctx.revert();
    }
  }, [status]);

  useEffect(() => {
    if (status === 'complete') {
      const ctx = gsap.context(() => {
        // 3. Success Explosion/Checkmark
        const tl = gsap.timeline();

        // Button morphs or changes color
        tl.to(buttonRef.current, {
          backgroundColor: '#10B981', // Green-500
          width: '180px',
          duration: 0.4
        });

        // Checkmark draws in
        if (checkmarkRef.current) {
          const length = checkmarkRef.current.getTotalLength();
          gsap.set(checkmarkRef.current, { strokeDasharray: length, strokeDashoffset: length });
          tl.to(checkmarkRef.current, {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }

        // Celebrate
        tl.to(".confetti", {
          y: "random(-100, -200)",
          x: "random(-50, 50)",
          rotation: "random(0, 360)",
          opacity: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out"
        }, "<");

      });
      return () => ctx.revert();
    }
  }, [status]);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">

          {/* Left Side: Content */}
          <div className="p-10 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to ship?
            </h2>
            <p className="text-slate-600 mb-8">
              Experience the fastest deployment pipeline. Click below to simulate a live deployment.
            </p>

            <div className="relative">
              <button
                ref={buttonRef}
                onClick={startDeploy}
                disabled={status !== 'idle'}
                className={`relative overflow-hidden h-14 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center ${status === 'idle' ? 'w-48 bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30' :
                  status === 'building' ? 'w-64 bg-slate-800 cursor-default' : 'w-48 bg-emerald-500 cursor-default'
                  }`}
              >
                <span className={`absolute transition-opacity duration-300 ${status === 'idle' ? 'opacity-100' : 'opacity-0'}`}>
                  Deploy to Production
                </span>

                {status === 'building' && (
                  <div className="w-full px-4 flex items-center gap-3">
                    <span className="text-sm font-mono text-slate-300">Building...</span>
                    <div className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
                      <div ref={progressBarRef} className="h-full bg-indigo-500 w-0" />
                    </div>
                  </div>
                )}

                {status === 'complete' && (
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path ref={checkmarkRef} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Deployed!</span>
                  </div>
                )}
              </button>

              {/* Confetti Particles (Hidden by default) */}
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`confetti absolute top-0 left-1/2 w-2 h-2 rounded-full pointer-events-none opacity-100 ${['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-green-400'][i % 4]
                  }`} style={{ display: status === 'complete' ? 'block' : 'none' }} />
              ))}
            </div>

          </div>

          {/* Right Side: Terminal Simulation */}
          <div className="bg-slate-900 md:w-1/2 p-6 font-mono text-sm overflow-hidden flex flex-col relative min-h-[300px]">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <div ref={terminalRef} className="space-y-2 text-slate-300">
              <div className="flex gap-2">
                <span className="text-indigo-400">➜</span>
                <span>~ project deploy</span>
              </div>

              {status !== 'idle' && (
                <>
                  <div className="terminal-line text-slate-400">→ Initializing build environment...</div>
                  <div className="terminal-line text-slate-400">→ Installing dependencies (pnpm)...</div>
                  <div className="terminal-line text-slate-400">→ Optimizing assets...</div>
                  <div className="terminal-line text-emerald-400">✓ Build completed in 1.2s</div>
                  <div className="terminal-line text-slate-400">→ Uploading to edge network...</div>
                  <div className="terminal-line text-slate-400">→ Verifying SSL certificates...</div>
                  <div className="terminal-line text-indigo-400 font-bold">
                    {status === 'complete' ? '🚀 Deployment live at https://app.brand.com' : '...'}
                  </div>
                </>
              )}

              {status === 'idle' && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-4 bg-slate-500 ml-1 align-middle"
                />
              )}
            </div>

            {/* Decorative gradient glow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default DeployCTA;

