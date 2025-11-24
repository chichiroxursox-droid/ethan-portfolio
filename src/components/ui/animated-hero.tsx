import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedHeroProps {
  titles: string[];
}

function AnimatedHero({ titles }: AnimatedHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, titleNumber === 0 ? 3000 : 2000); // Show "Ethan Hauger" longer
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="relative flex justify-center overflow-hidden text-center" style={{ minHeight: '120px' }}>
        {titles.map((title, index) => (
          <motion.h1
            key={index}
            className="absolute text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", stiffness: 50 }}
            animate={
              titleNumber === index
                ? {
                    y: 0,
                    opacity: 1,
                  }
                : {
                    y: titleNumber > index ? -150 : 150,
                    opacity: 0,
                  }
            }
          >
            {title}
          </motion.h1>
        ))}
      </div>
    </div>
  );
}

export { AnimatedHero };
