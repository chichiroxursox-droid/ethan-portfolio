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
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="inline-block">
      <div className="text-sm md:text-base font-medium">
        <span className="relative flex justify-center overflow-hidden text-center h-6">
          {titles.map((title, index) => (
            <motion.span
              key={index}
              className="absolute"
              initial={{ opacity: 0, y: "-100" }}
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
            </motion.span>
          ))}
        </span>
      </div>
    </div>
  );
}

export { AnimatedHero };
