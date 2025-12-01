import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Setup: Set transforms for 3D-like parallax feel
      gsap.set(shapesRef.current?.children || [], {
        transformOrigin: "center center"
      });

      // 2. Complex Intro Sequence Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Step A: Background Shapes Expand with Elasticity
      tl.from(shapesRef.current?.children || [], {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 2,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
      });

      // Step B: Badge drops in
      tl.from(badgeRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=1.5");

      // Step C: Title words reveal (simulated stagger since we don't have SplitText)
      // We will treat the whole block as one for now, but with skew
      tl.from(titleRef.current, {
        y: 100,
        skewY: 7,
        opacity: 0,
        duration: 1,
      }, "-=1.2");

      // Step D: Description and Buttons fade up
      tl.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, "-=0.8");

      tl.from(buttonsRef.current?.children || [], {
        scale: 0.8,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.6");

      // 3. Continuous "Breathing" Animation for Shapes
      // Moving them in a figure-8 or random float pattern
      const shapes = shapesRef.current?.children;
      if (shapes) {
        Array.from(shapes).forEach((shape, i) => {
          gsap.to(shape, {
            x: "random(-20, 20)",
            y: "random(-20, 20)",
            rotation: "random(-15, 15)",
            duration: 3 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });

          // Add a pulsating scale effect
          gsap.to(shape, {
            scale: 1.1,
            duration: 2 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5
          });
        });
      }

      // 4. Mouse Move Parallax Interaction
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;

        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        // Move shapes opposite to mouse
        gsap.to(shapesRef.current?.children || [], {
          x: (i) => xPos * 100 * (i + 1), // Different depths
          y: (i) => yPos * 100 * (i + 1),
          duration: 1,
          ease: "power2.out",
          overwrite: "auto" // allow overwriting the floating animation's x/y temporarily
        });

        // Tilt the text container slightly
        gsap.to(contentRef.current, {
          rotationY: xPos * 5,
          rotationX: -yPos * 5,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef); // Scope to container

    return () => ctx.revert();
  }, []);

  // Button hover effect helper
  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 pt-20 perspective-1000">
      {/* Background Shapes with distinct colors/sizes */}
      <div ref={shapesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[15%] w-72 h-72 bg-purple-400/30 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute top-[20%] right-[15%] w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[10%] left-[30%] w-80 h-80 bg-pink-400/30 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute top-[40%] left-[50%] w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center perspective-1000">
        <div ref={badgeRef} className="inline-block mb-6">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide cursor-default hover:bg-indigo-200 transition-colors">
            v2.0 is now live
          </span>
        </div>

        <h1 ref={titleRef} className="text-5xl md:text-8xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Build faster with <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
            Intelligent Tools
          </span>
        </h1>

        <div ref={contentRef}>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Deploy your applications in seconds, not hours. Our platform handles the infrastructure so you can focus on code.
          </p>

          <div ref={buttonsRef} className="flex justify-center gap-4">
            <button
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30 text-lg"
            >
              Start Building
            </button>
            <button
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm text-lg"
            >
              Live Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
