import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BackgroundPaths } from "@/components/ui/background-paths";

const Start = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const name = "Ethan Hauger";

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <motion.div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background cursor-default"
      onClick={handleClick}
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <BackgroundPaths />

      <div className="relative z-10 text-center">
        <motion.h1
          className="text-7xl md:text-9xl font-bold mb-8 tracking-tighter"
          whileHover={{
            scale: 1.05,
            filter: "brightness(1.2)",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {name.split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: index * (0.01 + Math.random() * 0.05),
                type: "spring",
                stiffness: 150,
                damping: 25,
              }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80 hover:from-primary hover:to-primary/80 transition-all duration-300"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-lg md:text-xl text-muted-foreground"
        >
          Click anywhere to continue
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Start;
