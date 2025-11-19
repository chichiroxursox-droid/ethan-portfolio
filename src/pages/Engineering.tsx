import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Home, Youtube, X } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import miniHouse1 from "@/assets/mini-house-1.jpg";
import miniHouse2 from "@/assets/mini-house-2.jpg";
import miniHouse3 from "@/assets/mini-house-3.jpg";
import miniHouse4 from "@/assets/mini-house-4.jpg";
import miniHouse5 from "@/assets/mini-house-5.jpg";
import miniHouse6 from "@/assets/mini-house-6.jpg";

const Engineering = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const miniHouseReveal = useScrollReveal();
  const rubeGoldbergReveal = useScrollReveal();
  const footerReveal = useScrollReveal();

  const miniHouseImages = [
    { src: miniHouse1, caption: "Foundation and frame construction" },
    { src: miniHouse2, caption: "Platform stage development" },
    { src: miniHouse3, caption: "Roof framing assembly" },
    { src: miniHouse4, caption: "Wall framing progress" },
    { src: miniHouse5, caption: "Completed exterior structure" },
    { src: miniHouse6, caption: "Finished house with roofing" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-inter">
      <Navigation />
      
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Full size view" 
            className="max-w-full max-h-[90vh] object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      
      <main className="container mx-auto px-6 pt-32 pb-24 relative">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 159, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 159, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%)'
          }} />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF9F]/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00D9FF]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-20 relative z-10">
          <div className="space-y-4 mb-8">
            <div className="inline-block">
              <span className="font-mono text-xs tracking-wider text-[#00FF9F] uppercase bg-[#00FF9F]/10 px-3 py-1 rounded-full border border-[#00FF9F]/20">
                Engineering Projects
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Building the<br />
              <span className="bg-gradient-to-r from-[#00FF9F] to-[#00D9FF] bg-clip-text text-transparent">
                Future
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl font-light">
              Combining technical precision with creative problem-solving to create meaningful impact
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-32 relative z-10">
          {/* Mini House Project */}
          <section 
            ref={miniHouseReveal.ref}
            className={`relative transition-all duration-1000 ${
              miniHouseReveal.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8 sticky top-24">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00FF9F]/10 rounded-lg border border-[#00FF9F]/20">
                    <Home className="w-6 h-6 text-[#00FF9F]" />
                  </div>
                  <h2 className="text-4xl font-bold text-white font-mono">
                    APOCALYPSE_SHELTER.EXE
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Engineered a 16' x 16' sustainable shelter designed to survive hypothetical apocalypse scenarios. 
                    This project merged structural engineering principles with hands-on construction expertise.
                  </p>
                  
                  <div className="bg-[#111111] border border-gray-800 rounded-lg p-6 space-y-4">
                    <h3 className="font-mono text-[#00FF9F] text-sm uppercase tracking-wider">
                      Technical Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                      <div>
                        <div className="text-gray-500">Dimensions</div>
                        <div className="text-white">16' × 16'</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Foundation</div>
                        <div className="text-white">Concrete Base</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Structure</div>
                        <div className="text-white">Wood Frame</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Status</div>
                        <div className="text-[#00FF9F]">Completed</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <h4 className="font-mono text-white text-sm uppercase tracking-wider">
                      Key Features
                    </h4>
                    <ul className="space-y-2 text-gray-400">
                      {[
                        "Structural foundation using engineering principles",
                        "Advanced weatherproofing and insulation",
                        "Full carpentry and construction implementation",
                        "Sustainable design for long-term durability"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <span className="text-[#00FF9F] mt-1 group-hover:scale-110 transition-transform">→</span>
                          <span className="group-hover:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interactive Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                {miniHouseImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <img
                      src={image.src}
                      alt={image.caption}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        hoveredIndex === index ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-mono text-xs">{image.caption}</p>
                      </div>
                    </div>
                    <div className={`absolute inset-0 border-2 border-[#00FF9F] transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Rube Goldberg Project */}
          <section 
            ref={rubeGoldbergReveal.ref}
            className={`relative transition-all duration-1000 delay-200 ${
              rubeGoldbergReveal.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2 space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00D9FF]/10 rounded-lg border border-[#00D9FF]/20">
                    <Youtube className="w-6 h-6 text-[#00D9FF]" />
                  </div>
                  <h2 className="text-4xl font-bold text-white font-mono">
                    RUBE_GOLDBERG.SYS
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Engineered the critical first sequence of a complex chain-reaction machine. 
                    Precision timing and mechanical understanding were essential to trigger the entire system.
                  </p>
                  
                  <div className="bg-[#111111] border border-gray-800 rounded-lg p-6 space-y-4">
                    <h3 className="font-mono text-[#00D9FF] text-sm uppercase tracking-wider">
                      Project Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center font-mono text-sm">
                        <span className="text-gray-500">Year</span>
                        <span className="text-white">10th Grade</span>
                      </div>
                      <div className="flex justify-between items-center font-mono text-sm">
                        <span className="text-gray-500">Team Section</span>
                        <span className="text-[#00D9FF]">Initiator Module</span>
                      </div>
                      <div className="flex justify-between items-center font-mono text-sm">
                        <span className="text-gray-500">Complexity</span>
                        <span className="text-white">Multi-Stage Chain</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <h4 className="font-mono text-white text-sm uppercase tracking-wider">
                      Engineering Principles
                    </h4>
                    <ul className="space-y-2 text-gray-400">
                      {[
                        "Physics and mechanics for chain reactions",
                        "Precision timing and trigger mechanisms",
                        "Collaborative system integration",
                        "Iterative testing and optimization"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <span className="text-[#00D9FF] mt-1 group-hover:scale-110 transition-transform">→</span>
                          <span className="group-hover:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:order-1 relative group">
                <div className="aspect-video bg-black rounded-lg overflow-hidden border-2 border-gray-800 group-hover:border-[#00D9FF] transition-all duration-500">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/l9VnBqaSKGw" 
                    title="Rube Goldberg Machine Project" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00D9FF] to-[#00FF9F] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
              </div>
            </div>
          </section>

          {/* Terminal-style Footer Section */}
          <section 
            ref={footerReveal.ref}
            className={`border border-gray-800 rounded-lg bg-[#111111] p-8 transition-all duration-1000 delay-300 ${
              footerReveal.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`}
          >
            <div className="font-mono text-sm space-y-2">
              <div className="text-[#00FF9F]">
                <span className="text-gray-500">user@ethan-hauger</span>
                <span className="text-white">:</span>
                <span className="text-[#00D9FF]">~/engineering</span>
                <span className="text-white">$</span>
                <span className="text-gray-400 ml-2">cat philosophy.txt</span>
              </div>
              <div className="text-gray-300 pl-4 pt-4 leading-relaxed">
                My approach to engineering is rooted in the belief that technology and design 
                should serve communities and create positive social impact. Through project-based 
                learning at Science Leadership Academy, I've learned to combine technical skills 
                with creative problem-solving to address real-world challenges.
              </div>
              <div className="text-[#00FF9F] pt-2">
                <span className="animate-pulse">▋</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Engineering;
