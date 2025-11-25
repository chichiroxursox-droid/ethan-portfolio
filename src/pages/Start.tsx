import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BackgroundPaths } from "@/components/ui/background-paths";

const Start = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const name = "Ethan Hauger";

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

      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-7xl md:text-9xl font-bold mb-12 tracking-tighter overflow-visible"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
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
                delay: index * 0.08,
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
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-base md:text-lg text-white/50 font-light tracking-wide"
        >
          Click anywhere to continue
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Start;
