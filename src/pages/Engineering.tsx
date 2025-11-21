import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Home, Youtube, X } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSectionTheme } from "@/hooks/use-section-theme";
import miniHouse1 from "@/assets/mini-house-1.jpg";
import miniHouse2 from "@/assets/mini-house-2.jpg";
import miniHouse3 from "@/assets/mini-house-3.jpg";
import miniHouse4 from "@/assets/mini-house-4.jpg";
import miniHouse5 from "@/assets/mini-house-5.jpg";
import miniHouse6 from "@/assets/mini-house-6.jpg";
import goatHouse1 from "@/assets/goat-house-1.jpeg";
import goatHouse2 from "@/assets/goat-house-2.png";
import goatHouse3 from "@/assets/goat-house-3.png";
import goatHouse4 from "@/assets/goat-house-4.png";
import goatHouse5 from "@/assets/goat-house-5.jpeg";
import goatHouse6 from "@/assets/goat-house-6.jpeg";
import goatHouse7 from "@/assets/goat-house-7.jpeg";
import goatHouse8 from "@/assets/goat-house-8.jpeg";
import goatHouse9 from "@/assets/goat-house-9.jpeg";
import goatHouse10 from "@/assets/goat-house-10.png";
import goatHouse11 from "@/assets/goat-house-11.png";
import goatHouse12 from "@/assets/goat-house-12.png";
import goatHouse13 from "@/assets/goat-house-13.png";
import goatHouse14 from "@/assets/goat-house-14.png";
import goatHouse15 from "@/assets/goat-house-15.png";
import goatHouse16 from "@/assets/goat-house-16.png";
import goatProcess1 from "@/assets/goat-process-1.jpeg";
import goatProcess2 from "@/assets/goat-process-2.png";
import goatProcess3 from "@/assets/goat-process-3.png";
import goatProcess4 from "@/assets/goat-process-4.png";
import goatProcess5 from "@/assets/goat-process-5.png";
import goatProcess6 from "@/assets/goat-process-6.png";
import goatProcess7 from "@/assets/goat-process-7.png";

const Engineering = () => {
  useSectionTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const miniHouseReveal = useScrollReveal();
  const goatHousesReveal = useScrollReveal();
  const rubeGoldbergReveal = useScrollReveal();
  const miniHouseImages = [{
    src: miniHouse1,
    caption: "Foundation and frame construction"
  }, {
    src: miniHouse2,
    caption: "Platform stage development"
  }, {
    src: miniHouse4,
    caption: "Wall framing progress"
  }, {
    src: miniHouse3,
    caption: "Roof framing assembly"
  }, {
    src: miniHouse5,
    caption: "Completed exterior structure"
  }, {
    src: miniHouse6,
    caption: "Finished house with roofing"
  }];
  const goatHouseImages = [{
    src: goatHouse2,
    caption: "Initial planning and measurements"
  }, {
    src: goatHouse3,
    caption: "Foundation preparation"
  }, {
    src: goatHouse4,
    caption: "Base construction phase"
  }, {
    src: goatHouse1,
    caption: "Frame assembly beginning"
  }, {
    src: goatHouse5,
    caption: "Wall structure development"
  }, {
    src: goatHouse6,
    caption: "Roof framing progress"
  }, {
    src: goatHouse7,
    caption: "Team collaboration on structure"
  }, {
    src: goatHouse8,
    caption: "Exterior finishing work"
  }, {
    src: goatHouse9,
    caption: "Final assembly stages"
  }, {
    src: goatHouse10,
    caption: "Detail work and refinements"
  }, {
    src: goatHouse11,
    caption: "Second house foundation"
  }, {
    src: goatHouse12,
    caption: "Parallel construction work"
  }, {
    src: goatHouse13,
    caption: "Third house framing"
  }, {
    src: goatHouse14,
    caption: "Roofing installation"
  }, {
    src: goatHouse15,
    caption: "Near completion phase"
  }, {
    src: goatHouse16,
    caption: "All three goat houses completed"
  }];

  const processSlides = [
    goatProcess1,
    goatProcess2,
    goatProcess3,
    goatProcess4,
    goatProcess5,
    goatProcess6,
    goatProcess7
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % processSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [processSlides.length]);
  return <div className="min-h-screen bg-[#0A0A0A] font-inter transition-all duration-500">
      <Navigation />
      
      {/* Lightbox Modal */}
      {selectedImage && <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10" onClick={() => setSelectedImage(null)}>
            <X className="w-8 h-8" />
          </button>
          <img src={selectedImage} alt="Full size view" className="max-w-full max-h-[90vh] object-contain animate-scale-in" onClick={e => e.stopPropagation()} />
        </div>}
      
      <main className="container mx-auto px-6 pt-32 pb-24 relative">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
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
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#00D9FF]/20 rounded-full blur-[100px] animate-pulse" style={{
          animationDelay: '1s'
        }} />
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

        <div className="max-w-7xl mx-auto space-y-32">
          {/* Mini House Project */}
          <section ref={miniHouseReveal.ref} className={`transition-all duration-1000 ${miniHouseReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8 lg:sticky lg:top-24 z-20 bg-[#0A0A0A] p-6 rounded-lg">
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
                      {["Structural foundation using engineering principles", "Wall framing and structural support", "Roof framing and truss assembly", "Advanced weatherproofing and insulation"].map((item, i) => <li key={i} className="flex items-start gap-3 group">
                          <span className="text-[#00FF9F] mt-1 group-hover:scale-110 transition-transform">→</span>
                          <span className="group-hover:text-white transition-colors">{item}</span>
                        </li>)}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interactive Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                {miniHouseImages.map((image, index) => <div key={index} className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} onClick={() => setSelectedImage(image.src)}>
                    <img src={image.src} alt={image.caption} className={`w-full h-full object-cover transition-all duration-500 ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`} />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-mono text-xs">{image.caption}</p>
                      </div>
                    </div>
                    <div className={`absolute inset-0 border-2 border-[#00FF9F] transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} />
                  </div>)}
              </div>
            </div>
          </section>

          {/* Goat Houses Project */}
          <section ref={goatHousesReveal.ref} className={`transition-all duration-1000 ${goatHousesReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8 lg:sticky lg:top-24 z-20 bg-[#0A0A0A] p-6 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FFB800]/10 rounded-lg border border-[#FFB800]/20">
                    <Home className="w-6 h-6 text-[#FFB800]" />
                  </div>
                  <h2 className="text-4xl font-bold text-white font-mono">
                    GOAT_SHELTERS.BUILD
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Built three complete goat houses as part of a summer engineering program. 
                    Led hands-on construction with a team of engineering students, from foundation to final assembly.
                  </p>
                  
                  <div className="bg-[#111111] border border-gray-800 rounded-lg p-6 space-y-4">
                    <h3 className="font-mono text-[#FFB800] text-sm uppercase tracking-wider">
                      Project Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                      <div>
                        <div className="text-gray-500">Structures Built</div>
                        <div className="text-white">3 Complete Houses</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Team</div>
                        <div className="text-white">Engineering Students</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Duration</div>
                        <div className="text-white">Summer Program</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Status</div>
                        <div className="text-[#FFB800]">Completed</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <h4 className="font-mono text-white text-sm uppercase tracking-wider">
                      Skills Applied
                    </h4>
                    <ul className="space-y-2 text-gray-400">
                      {["Team leadership and collaboration", "Construction planning and execution", "Material selection and management", "Hands-on carpentry and assembly"].map((item, i) => <li key={i} className="flex items-start gap-3 group">
                          <span className="text-[#FFB800] mt-1 group-hover:scale-110 transition-transform">→</span>
                          <span className="group-hover:text-white transition-colors">{item}</span>
                        </li>)}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interactive Image Grid - 4 columns */}
              <div className="grid grid-cols-4 gap-3">
                {goatHouseImages.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                    onMouseEnter={() => setHoveredIndex(index + 100)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <img 
                      src={image.src} 
                      alt={image.caption}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        hoveredIndex === index + 100 ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
                      hoveredIndex === index + 100 ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-mono text-xs">{image.caption}</p>
                      </div>
                    </div>
                    <div className={`absolute inset-0 border-2 border-[#FFB800] transition-opacity duration-300 ${
                      hoveredIndex === index + 100 ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Process Slideshow */}
            <div className="mt-16 space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white font-mono">
                  BUILD_PROCESS.SLIDESHOW
                </h3>
              </div>
              
              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-[#FFB800]/20">
                {processSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img 
                      src={slide} 
                      alt={`Build process step ${index + 1}`}
                      className="w-full h-full object-contain bg-black"
                    />
                  </div>
                ))}
                
                {/* Progress Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {processSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-[#FFB800] w-6' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Rube Goldberg Project */}
          <section ref={rubeGoldbergReveal.ref} className={`transition-all duration-1000 delay-200 ${rubeGoldbergReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8 lg:sticky lg:top-24 z-20 bg-[#0A0A0A] p-6 rounded-lg">
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
                    Collaborated on a complex Rube Goldberg machine project in 10th grade. 
                    My team contributed the very first section, setting the chain reaction in motion.
                  </p>
                  
                  <div className="bg-[#111111] border border-gray-800 rounded-lg p-6 space-y-4">
                    <h3 className="font-mono text-[#00D9FF] text-sm uppercase tracking-wider">
                      Project Highlights
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-gray-800 pb-2">
                        <span className="text-gray-500">Role</span>
                        <span className="text-white font-mono">Opening Section</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-800 pb-2">
                        <span className="text-gray-500">Team Effort</span>
                        <span className="text-white font-mono">Collaborative</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <span className="text-[#00D9FF] font-mono">Completed</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <h4 className="font-mono text-white text-sm uppercase tracking-wider">
                      Engineering Principles
                    </h4>
                    <ul className="space-y-2 text-gray-400">
                      {["Energy transfer and momentum", "Precise timing and synchronization", "Mechanical chain reactions", "Problem-solving and iteration"].map((item, i) => <li key={i} className="flex items-start gap-3 group">
                          <span className="text-[#00D9FF] mt-1 group-hover:scale-110 transition-transform">→</span>
                          <span className="group-hover:text-white transition-colors">{item}</span>
                        </li>)}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Video Embed */}
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#00D9FF]/20 hover:border-[#00D9FF]/40 transition-colors">
                  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/l9VnBqaSKGw?si=7qHm62m26NW4Ad3o" title="Rube Goldberg Machine Project" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
                </div>
                <div className="mt-4 text-sm text-gray-500 font-mono text-center">
                  Watch the full Rube Goldberg machine in action
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>;
};
export default Engineering;