import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import Lenis from '@studio-freight/lenis'; 

// --- IMPORT IMAGES DIRECTLY (NEW) ---
// இந்த லைன்ல Error வந்தால், ஃபைல் பெயர் தப்பா இருக்குனு அர்த்தம்.
import rahaLogo from './assets/Rahaalog.jpg'; 
import solarImg from './assets/solar.jpg';
// (உங்க Resume மட்டும் public ஃபோல்டர்லேயே இருக்கட்டும்)

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  // --- 1. SMOOTH SCROLL ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Mouse Move Logic
  useEffect(() => {
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mouseMove);
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Cursor Variants
  const variants = {
    default: { x: mousePosition.x - 16, y: mousePosition.y - 16, height: 32, width: 32, backgroundColor: "transparent", border: "1px solid #E5B86E" },
    text: { x: mousePosition.x - 40, y: mousePosition.y - 40, height: 80, width: 80, backgroundColor: "#E5B86E", mixBlendMode: "difference", border: "none" }
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <div className="min-h-screen font-body selection:bg-rahaa-gold selection:text-rahaa-bg overflow-x-hidden relative bg-rahaa-bg">
      
      {/* --- 3D SPACE BACKGROUND --- */}
      <ThreeDSpaceBackground />
      
      <div className="noise-overlay fixed inset-0 z-[90] pointer-events-none opacity-[0.03]"></div>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-rahaa-gold origin-left z-[10001]" style={{ scaleX }} />
      
      {/* Custom Cursor */}
      <motion.div className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none hidden md:block" variants={variants} animate={cursorVariant} transition={{ type: "spring", stiffness: 500, damping: 28 }} />
      <motion.div className="fixed top-0 left-0 z-[9999] w-2 h-2 bg-rahaa-gold rounded-full pointer-events-none hidden md:block" animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }} transition={{ type: "spring", stiffness: 1000, damping: 50 }} />

      {/* --- PRELOADER --- */}
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1 } }} className="fixed inset-0 z-[10000] bg-rahaa-bg flex items-center justify-center flex-col">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="relative">
                <h1 className="text-4xl md:text-6xl font-luxury text-rahaa-gold tracking-[0.2em] text-center">RAGUL DRAVID</h1>
            </motion.div>
            <motion.div initial={{ width: 0 }} animate={{ width: 200 }} className="h-[1px] bg-rahaa-gold mt-6" />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          {/* NAVBAR */}
          <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="fixed w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md bg-rahaa-bg/60 border-b border-rahaa-gold/5">
            <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className="text-xl md:text-2xl font-luxury font-bold text-rahaa-gold tracking-[0.2em] cursor-pointer">
              RAGUL DRAVID
            </h1>
            <div className="hidden md:flex space-x-10 text-[10px] font-bold tracking-[0.2em] text-rahaa-gold/80">
              {['HOME', 'PHILOSOPHY', 'SKILLS', 'WORK', 'CONTACT'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onMouseEnter={textEnter} onMouseLeave={textLeave} className="hover:text-white transition-all duration-300 relative group">
                  {item}
                  <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-rahaa-gold transition-all duration-300 group-hover:w-1/2 group-hover:-translate-x-1/2"></span>
                </a>
              ))}
            </div>
          </motion.nav>

          {/* HERO SECTION */}
          <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 relative overflow-hidden">
            <div className="z-10 flex flex-col items-center max-w-5xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 1 }}
                className="relative mb-8 group cursor-none" 
                onMouseEnter={textEnter} 
                onMouseLeave={textLeave}
              >
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -inset-3 border border-dashed border-rahaa-gold/30 rounded-full"></motion.div>
                 
                 {/* HERO IMAGE: Use public folder path "/profile.jpg" or import it similarly if needed */}
                 <img src="/profile.jpg" alt="Ragul Dravid" className="relative w-40 h-40 md:w-48 md:h-48 object-cover object-top rounded-full border border-rahaa-gold grayscale group-hover:grayscale-0 transition-all duration-700" />
              </motion.div>

              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-rahaa-gold tracking-[0.4em] text-xs uppercase mb-6 border-b border-rahaa-gold/30 pb-2">Full Stack Engineering</motion.span>
              
              <h2 onMouseEnter={textEnter} onMouseLeave={textLeave} className="text-5xl md:text-8xl font-luxury text-rahaa-text mb-6 leading-tight">
                <RevealText text="CRAFTING DIGITAL" delay={0.2} />
                <br /> 
                <span className="text-rahaa-gold italic"><RevealText text="PERFECTION." delay={0.8} /></span>
              </h2>
              
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="text-rahaa-text/60 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
                I don't just write code; I engineer <b>high-performance ecosystems</b>. Specialized in building scalable MERN architectures that merge <b>mathematical precision</b> with <b>luxury aesthetics</b>.
              </motion.p>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} className="flex gap-6">
                 <LuxuryButton text="Download CV" href="/resume.pdf" onMouseEnter={textEnter} onMouseLeave={textLeave} />
                 <LuxuryButton text="Explore Work" href="#work" outline onMouseEnter={textEnter} onMouseLeave={textLeave} />
              </motion.div>
            </div>
          </section>

          {/* INFINITE MARQUEE */}
          <div className="py-10 border-y border-rahaa-gold/10 bg-rahaa-gold/5 overflow-hidden backdrop-blur-sm">
             <MarqueeText />
          </div>

          {/* PHILOSOPHY SECTION */}
          <section id="philosophy" className="py-32 px-6 md:px-20 relative">
             <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                   <SectionHeader title="The Philosophy" num="01" />
                   <h3 className="text-3xl font-luxury text-white mb-6 leading-snug">"Efficiency is the ultimate form of Luxury."</h3>
                   <p className="text-rahaa-text/60 mb-6 leading-relaxed">
                      With a background in <b>Mathematics</b> and experience in <b>Financial Operations</b>, I bring a unique analytical approach to development. My code isn't just functional; it's optimized for speed, security, and scalability.
                   </p>
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                   <StatBox num="30%" label="Faster Page Loads" desc="Database Optimization" />
                   <StatBox num="100%" label="Secure Transactions" desc="Payment Integrity" />
                   <StatBox num="AI" label="Predictive Models" desc="TensorFlow Integration" />
                   <StatBox num="2+" label="Years Experience" desc="Full Stack & Ops" />
                </div>
             </div>
          </section>

          {/* SKILLS SECTION */}
          <section id="skills" className="py-32 px-6 md:px-20 relative bg-rahaa-card/10">
             <div className="max-w-7xl mx-auto">
               <SectionHeader title="Technical Arsenal" num="02" />
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <GridCard title="Frontend Architecture" skills={['React.js', 'Redux State', 'Tailwind CSS', 'Framer Motion']} delay={0.1} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
                  <GridCard title="Backend Engineering" skills={['Node.js Microservices', 'Express.js', 'RESTful APIs', 'JWT Security']} delay={0.2} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>} />
                  <GridCard title="Data & Cloud" skills={['MongoDB Optimization', 'PostgreSQL', 'Docker', 'CI/CD Pipelines']} delay={0.3} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} />
               </div>
             </div>
          </section>

          {/* WORK SECTION WITH IMPORTED IMAGES */}
          <section id="work" className="py-32 px-6 md:px-20 bg-rahaa-card/20 relative">
             <div className="max-w-7xl mx-auto">
               <SectionHeader title="Signature Works" num="03" />
               <div className="space-y-32 mt-20">
                  <TiltProjectCard 
                    title="House of Rahaa" cat="Luxury E-Commerce Ecosystem" desc="Engineered a high-fidelity shopping platform. Implemented automated customer lifecycle notifications and a Razorpay payment gateway ensuring 100% transaction integrity."
                    link="https://house-of-rahaa-frontend.vercel.app/" align="left" onMouseEnter={textEnter} onMouseLeave={textLeave}
                    image={rahaLogo} // Using imported image
                  />
                  <TiltProjectCard 
                    title="Solar AI Intelligence" cat="Predictive Analytics Dashboard" desc="Architected an AI-driven platform using TensorFlow.js to forecast energy yields. Integrated Visual Crossing Weather API for real-time environmental data processing."
                    link="https://raguldravid.pythonanywhere.com/" align="right" onMouseEnter={textEnter} onMouseLeave={textLeave}
                    image={solarImg} // Using imported image
                  />
               </div>
             </div>
          </section>

          {/* FOOTER */}
          <footer id="contact" className="py-24 text-center border-t border-rahaa-gold/10 bg-gradient-to-b from-rahaa-bg to-black relative z-10">
             <div className="mb-10">
                <p className="text-rahaa-gold text-xs tracking-[0.3em] uppercase mb-4">Available for High-Impact Roles</p>
                <h2 className="text-5xl md:text-7xl font-luxury text-white">Let's Build the Future.</h2>
                <a href="mailto:raguldravid917@gmail.com" onMouseEnter={textEnter} onMouseLeave={textLeave} className="block mt-6 text-2xl md:text-3xl text-rahaa-gold/80 hover:text-rahaa-gold transition-colors font-luxury">
                  raguldravid917@gmail.com
                </a>
             </div>
             <div className="flex justify-center gap-12 mt-16 relative z-10">
                <SocialLink href="https://www.linkedin.com/in/ragul-dravid-b0b46027b" text="LinkedIn" onMouseEnter={textEnter} onMouseLeave={textLeave} />
                <SocialLink href="mailto:raguldravid917@gmail.com" text="Email" onMouseEnter={textEnter} onMouseLeave={textLeave} />
                <SocialLink href="https://github.com/raguldravid917-alt" text="GitHub" onMouseEnter={textEnter} onMouseLeave={textLeave} />
             </div>
             <p className="mt-20 text-rahaa-text/20 text-[10px] tracking-widest">© 2026 RAGUL DRAVID. ENGINEERED IN MADURAI.</p>
          </footer>
        </>
      )}
    </div>
  );
}

/* --- COMPONENTS --- */

// 1. 3D SPACE BACKGROUND
const ThreeDSpaceBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-[-50%] w-[200%] h-[200%] opacity-30" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      <motion.div animate={{ scale: [1.2, 1.5, 1.2], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-[-20%] w-[140%] h-[140%] opacity-20" style={{ backgroundImage: 'radial-gradient(#E5B86E 2px, transparent 2px)', backgroundSize: '250px 250px' }} />
      <motion.div animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-rahaa-gold/5 rounded-full blur-[150px]" />
      <motion.div animate={{ x: [0, -100, 100, 0], y: [0, 50, -50, 0] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-[#4a0a0f]/20 rounded-full blur-[150px]" />
  </div>
);

// 2. INFINITE MARQUEE
const MarqueeText = () => (
  <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="flex gap-16 opacity-50 font-luxury text-2xl text-rahaa-gold uppercase tracking-widest">
          {[...Array(10)].map((_, i) => (
              <span key={i} className="flex items-center gap-4">React.js ✦ Node.js ✦ TensorFlow ✦ MongoDB ✦ Razorpay ✦ AWS ✦</span>
          ))}
      </motion.div>
  </div>
);

// 3. TILT PROJECT CARD - NOW ACCEPTS 'image' PROP
const TiltProjectCard = ({ title, cat, desc, link, align, onMouseEnter, onMouseLeave, image }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      x.set(event.clientX - rect.left - rect.width / 2);
      y.set(event.clientY - rect.top - rect.height / 2);
  };

  const isRahaa = title.includes("Rahaa");

  return (
      <motion.div 
          style={{ perspective: 1000 }}
          className={`flex flex-col md:flex-row gap-12 items-center ${align === 'right' ? 'md:flex-row-reverse' : ''}`}
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
      >
          <motion.div 
              style={{ rotateX, rotateY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => { x.set(0); y.set(0); }}
              className="flex-1 w-full h-[300px] md:h-[400px] relative overflow-hidden group border border-rahaa-gold/20 rounded-2xl cursor-pointer shadow-2xl shadow-black/50 bg-black"
          >
               <div className={`absolute inset-0 bg-gradient-to-br ${isRahaa ? 'from-[#4a0a0f] via-[#2A0406] to-black' : 'from-[#001E3C] via-[#0A1929] to-black'} transition duration-700`} />
               
               <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl">
                   {/* DISPLAY IMPORTED IMAGE */}
                   <img 
                     src={image} 
                     alt={title} 
                     className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                   />
                  
                  {!isRahaa && (
                      <div className="absolute inset-0 opacity-20 z-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                  )}
               </div>

               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 backdrop-blur-[2px] z-30"></div>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 z-40">
                  <a href={link} target="_blank" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="w-24 h-24 bg-rahaa-gold/90 rounded-full flex items-center justify-center text-rahaa-bg font-bold text-xs tracking-widest uppercase shadow-[0_0_30px_rgba(229,184,110,0.6)] transform translate-y-10 group-hover:translate-y-0 transition-all duration-500 hover:scale-110">Visit</a>
               </div>
          </motion.div>

          <div className="flex-1 space-y-6 text-center md:text-left">
               <span className="text-rahaa-gold text-xs tracking-[0.3em] uppercase border-b border-rahaa-gold/20 pb-2">{cat}</span>
               <h4 className="text-4xl md:text-5xl font-luxury text-white group-hover:text-rahaa-gold transition duration-300">{title}</h4>
               <p className="text-rahaa-text/70 leading-relaxed max-w-md text-sm md:text-base font-light">{desc}</p>
               <a href={link} target="_blank" className="inline-block mt-4 text-xs font-bold text-rahaa-gold uppercase tracking-widest hover:text-white transition">See Live Project →</a>
          </div>
      </motion.div>
  );
};

// --- HELPERS ---
const RevealText = ({ text, delay }) => (
  <motion.span initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
    {text.split("").map((char, index) => (
      <motion.span key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">{char === " " ? "\u00A0" : char}</motion.span>
    ))}
  </motion.span>
);

const SectionHeader = ({ title, num }) => (
  <div className="flex justify-between items-end mb-16 border-b border-rahaa-gold/20 pb-6">
    <h3 className="text-4xl md:text-5xl font-luxury text-rahaa-text">{title}</h3>
    <span className="text-rahaa-gold font-luxury text-xl italic">{num}</span>
  </div>
);

const StatBox = ({ num, label, desc }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-6 border border-rahaa-gold/10 bg-rahaa-bg hover:border-rahaa-gold/40 transition duration-300 group rounded-xl">
      <h4 className="text-3xl font-luxury text-rahaa-gold mb-1">{num}</h4>
      <p className="text-white text-xs font-bold uppercase tracking-wider mb-2">{label}</p>
      <p className="text-rahaa-text/50 text-[10px]">{desc}</p>
  </motion.div>
);

const GridCard = ({ title, skills, delay, icon }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -10, borderColor: "rgba(229,184,110, 0.5)" }} transition={{ delay, duration: 0.6 }} viewport={{ once: true }} className="bg-rahaa-bg p-10 border border-rahaa-gold/10 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(229,184,110,0.1)] rounded-xl">
    <div className="mb-6 text-rahaa-gold/50 group-hover:text-rahaa-gold transition duration-500">{icon}</div>
    <h4 className="text-xl font-luxury text-rahaa-gold mb-6 group-hover:translate-x-2 transition duration-300">{title}</h4>
    <ul className="space-y-3">
      {skills.map(s => <li key={s} className="text-rahaa-text/60 text-sm tracking-wide group-hover:text-rahaa-text transition flex items-center gap-2"><span className="w-1 h-1 bg-rahaa-gold rounded-full"></span> {s}</li>)}
    </ul>
  </motion.div>
);

const LuxuryButton = ({ text, href, outline, onMouseEnter, onMouseLeave }) => (
  <a href={href} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all duration-500 relative overflow-hidden group rounded-full ${outline ? 'border border-rahaa-gold text-rahaa-gold hover:text-rahaa-bg' : 'bg-rahaa-gold text-rahaa-bg hover:text-white'}`}>
    <span className="relative z-10">{text}</span>
    <div className={`absolute inset-0 ${outline ? 'bg-rahaa-gold' : 'bg-black'} transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out`} />
  </a>
);

const SocialLink = ({ href, text, onMouseEnter, onMouseLeave }) => (
  <a href={href} target="_blank" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="text-rahaa-text/50 hover:text-rahaa-gold transition text-xs tracking-widest uppercase border-b border-transparent hover:border-rahaa-gold pb-1 flex items-center gap-2">
    {text}
  </a>
);