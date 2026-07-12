import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Malik has been an awesome graphic designer for me for about 6/7 years now. He’s super detailed, takes to direction and puts initiative as well. I’ve also referred him to a couple of my friends and colleagues who have said amazing things about his work",
    author: "Lola Genesis",
    title: "Creator, Founder",
  },
  {
    id: 2,
    quote: "Malik transformed our brand identity completely. The new design language perfectly captures our vision and has significantly improved our user engagement.",
    author: "Damilola",
    title: "Founder, Ojah",
  },
  {
    id: 3,
    quote: "An exceptional creative who truly understands how to balance aesthetic beauty with functional usability. I highly recommend Malik for any digital project.",
    author: "Olamilekan",
    title: "Digital Creator",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="relative bg-[#0C0C0C] py-24 px-6 md:px-16 border-t border-white/10">
      <p className="font-['DM_Mono'] text-[11px] uppercase tracking-widest text-[#FF442B] mb-16">
        // Reviews
      </p>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Counter */}
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-[11px] uppercase tracking-widest text-white/25 mb-10"
        >
          {String(current + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
        </span>

        {/* Quote */}
        <div className="min-h-[220px] flex items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
              className="text-2xl md:text-4xl font-medium italic text-white leading-snug"
            >
              "{TESTIMONIALS[current].quote}"
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Author */}
        <div className="mb-12">
          <p
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-sm uppercase tracking-widest text-white font-bold mb-1"
          >
            {TESTIMONIALS[current].author}
          </p>
          <p
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-white/40 text-sm"
          >
            {TESTIMONIALS[current].title}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <button
            onClick={prev}
            className="w-11 h-11 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#FF442B] hover:text-[#FF442B] transition-colors"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[2px] transition-all duration-300 ${i === current ? "w-8 bg-[#FF442B]" : "w-4 bg-white/20"
                  }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-11 h-11 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#FF442B] hover:text-[#FF442B] transition-colors"
          >
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
