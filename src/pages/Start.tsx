import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BackgroundPaths } from "@/components/ui/background-paths";

interface Particle {
  id: number;
  x: number;
  y: number;
}

const Start = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const name = "Ethan Hauger";

  useEffect(() => {
    let particleId = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
      };
      
      setParticles((prev) => [...prev, newParticle].slice(-15));
      
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/home");
    }, 300);
  };

  return (
    <motion.div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black cursor-default"
      onClick={handleClick}
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <BackgroundPaths />

      {/* Cursor Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-white/30 pointer-events-none"
          initial={{ x: particle.x, y: particle.y, opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ left: 0, top: 0 }}
        />
      ))}

      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-7xl md:text-9xl font-bold mb-12 tracking-tighter overflow-visible"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          animate={{
            textShadow: isHovering
              ? [
                  "0 0 20px rgba(255,255,255,0.3)",
                  "0 0 40px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.3)",
                ]
              : "0 0 0px rgba(255,255,255,0)",
          }}
          transition={{
            textShadow: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {name.split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: isHovering ? [0, -15, 0] : 0, 
                opacity: 1 
              }}
              transition={{
                delay: index * 0.4,
                type: "spring",
                stiffness: 150,
                damping: 25,
                y: isHovering ? {
                  delay: index * 0.05,
                  duration: 0.5,
                  repeat: 0,
                  ease: "easeInOut"
                } : {}
              }}
              className="inline-block text-white"
              style={{ display: 'inline-block' }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6, duration: 1 }}
          className="text-lg md:text-xl text-white font-light tracking-wide"
        >
          Click anywhere to continue
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Start;
