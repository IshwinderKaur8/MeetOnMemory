import { useEffect, useState, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "features", label: "Features" },
  { id: "analytics", label: "Analytics" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export default function ScrollNavigator() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(true);
  
  const hideTimeoutRef = useRef(null);
  const isProgrammaticScrolling = useRef(false);
  const ticking = useRef(false); // Hardware scroll throttling lock

  useEffect(() => {
    const updateScrollStatus = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Show/Hide panel instantly based on scroll position
      setIsVisible(scrollY > viewportHeight * 0.15);

      // Reset auto-dimming timeout
      setIsUserScrolling(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 1500); // Dims faster for a cleaner look

      // Bypass calculations if an intentional click animation is active
      if (isProgrammaticScrolling.current) {
        ticking.current = false;
        return;
      }

      // Check section ranges matching screen coordinates
      const triggerPoint = viewportHeight * 0.35;

      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }

      ticking.current = false;
    };

    const onScroll = () => {
      // Use requestAnimationFrame to bind calculations directly to screen refresh rate
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollStatus);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(updateScrollStatus, 50); 

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    // OPTIMIZATION: Instantly switch the glowing dot state on click!
    setActiveSection(id);
    isProgrammaticScrolling.current = true;

    const navbarOffset = 80;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navbarOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Clear programmatic block as soon as smooth scroll concludes
    setTimeout(() => {
      isProgrammaticScrolling.current = false;
    }, 700);
  };

  const handleNext = () => {
    if (currentIndex < SECTIONS.length - 1) scrollToSection(SECTIONS[currentIndex + 1].id);
  };

  const handlePrev = () => {
    if (currentIndex > 0) scrollToSection(SECTIONS[currentIndex - 1].id);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[999] max-md:right-0 max-md:left-0 max-md:bottom-4 max-md:px-4 flex justify-center items-center pointer-events-none transition-all duration-150 transform ${
        isUserScrolling ? "opacity-100 scale-100" : "opacity-35 scale-98"
      }`}
    >
      <div className="pointer-events-auto flex md:flex-col items-center bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 rounded-full md:p-2 shadow-2xl text-white max-md:px-4 max-md:py-2 max-md:gap-4 max-md:w-full max-md:max-w-md max-md:justify-between">
        
        {/* Arrow Up */}
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="p-2 rounded-full hover:bg-zinc-800/80 text-zinc-400 hover:text-white transition-all disabled:opacity-10 disabled:pointer-events-none active:scale-95 cursor-pointer"
          title="Previous Section"
        >
          <ChevronUp size={18} className="max-md:-rotate-90" />
        </button>

        {/* Desktop Dots Matrix */}
        <div className="hidden md:flex flex-col gap-4 my-4 px-1.5">
          {SECTIONS.map((sec) => {
            const isActive = sec.id === activeSection;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="relative group flex items-center justify-center cursor-pointer p-1"
                aria-label={`Scroll to ${sec.label}`}
              >
                {/* Tooltip Label */}
                <span className="absolute right-8 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-2.5 py-1 rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-150 whitespace-nowrap shadow-xl">
                  {sec.label}
                </span>
                
                {/* Optimized Circle Element */}
                <div className="w-3 h-3 flex items-center justify-center">
                  <div
                    className={`rounded-full transition-all duration-150 will-change-transform ${
                      isActive 
                        ? "w-2.5 h-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]" 
                        : "w-1.5 h-1.5 bg-zinc-600 group-hover:bg-zinc-400 scale-100 group-hover:scale-110"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile View Title Card */}
        <div className="md:hidden flex items-center gap-2">
          <span className="text-xs tracking-wider text-zinc-500 uppercase font-mono">Section</span>
          <span className="text-xs font-semibold bg-zinc-800/50 text-zinc-200 px-3 py-1 rounded-md border border-zinc-700/30 min-w-[110px] text-center">
            {SECTIONS[currentIndex]?.label || "Loading..."}
          </span>
        </div>

        {/* Arrow Down */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= SECTIONS.length - 1 || currentIndex === -1}
          className="p-2 rounded-full hover:bg-zinc-800/80 text-zinc-400 hover:text-white transition-all disabled:opacity-10 disabled:pointer-events-none active:scale-95 cursor-pointer"
          title="Next Section"
        >
          <ChevronDown size={18} className="max-md:-rotate-90" />
        </button>

      </div>
    </div>
  );
}