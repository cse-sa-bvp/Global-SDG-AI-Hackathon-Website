"use client";
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FAQ = ({
  title = "Frequently Asked Questions",
  subtitle = "Frequently Asked Questions",
  categories,
  faqData,
  className,
  ...props
}) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#FAFAF7] px-4 py-16 text-foreground sm:py-20",
        className
      )}
      style={{ fontFamily: "'Poppins', sans-serif" }}
      {...props}
    >
      {/* Inline font imports — no separate file needed */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Poppins:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* <BackgroundDecor /> */}

      <div className="relative z-10">
        <FAQHeader title={title} subtitle={subtitle} />
        <FAQTabs
          categories={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        <FAQList faqData={faqData} selected={selectedCategory} />
        <FAQDots count={3} />
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Decorative background
// ---------------------------------------------------------------------------

const DotGrid = ({ className }) => (
  <div
    className={cn("h-28 w-28", className)}
    style={{
      backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
      backgroundSize: "14px 14px",
      color: "rgb(16 185 129 / 0.35)",
    }}
  />
);

const BackgroundDecor = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <span className="absolute -top-40 left-1/2 h-[420px] w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400/10 via-teal-400/10 to-blue-500/10 blur-3xl" />
    <span className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />
    <span className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
    <DotGrid className="absolute left-6 top-6 hidden sm:block" />
    <DotGrid className="absolute bottom-10 left-10 hidden sm:block" />
    <DotGrid className="absolute bottom-16 right-8 hidden sm:block" />
  </div>
);

// ---------------------------------------------------------------------------
// Header — Allura on the title, Poppins on the eyebrow
// ---------------------------------------------------------------------------

const FAQHeader = ({ title, subtitle }) => {
  const words = title.trim().split(" ");

  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center">
      <span className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-emerald-600">
        {subtitle}
      </span>

      <h2 className="mb-8 max-w-4xl text-balance leading-tight text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {words.map((word, i) => {
          const isAsked = word === "Asked";

          if (isAsked) {
            return (
              <span
                key={i}
                style={{
                  fontFamily: "'Allura', cursive",
                  fontSize: "2em",
                  fontWeight: 700,
                  background: "linear-gradient(120deg, #0b3b2e 0%, #0e9f6e 40%, #0e4d6e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                  lineHeight: 1.1,
                  verticalAlign: "middle",
                  marginLeft: "0.18em",
                  marginRight: "0.2em",
                  paddingLeft: "0.1em",
                  paddingRight: "0.2em",
                }}
              >
                {word}
              </span>
            );
          }

          return (
            <span key={i} className="text-[#010605]">
              {word}
              {i < words.length - 1 && " "}
            </span>
          );
        })}
      </h2>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Category tabs
// ---------------------------------------------------------------------------

const FAQTabs = ({ categories, selected, setSelected }) => (
  <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
    {Object.entries(categories).map(([key, label]) => (
      <button
        key={key}
        onClick={() => setSelected(key)}
        className={cn(
          "relative overflow-hidden whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300",
          selected === key
            ? "border-transparent text-white shadow-[0_6px_20px_rgba(13,58,94,0.35)]"
            : "border-neutral-200 bg-[#FBFBF9] text-neutral-700 hover:border-emerald-300 hover:text-emerald-700"
        )}
      >
        <span className="relative z-10">{label}</span>
        <AnimatePresence>
          {selected === key && (
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: "backIn" }}
              className="absolute inset-0 z-0 bg-gradient-to-r from-[#0b3b2e] via-[#0e4d6e] to-[#0b2a52]"
            />
          )}
        </AnimatePresence>
      </button>
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// FAQ list
// ---------------------------------------------------------------------------

const FAQList = ({ faqData, selected }) => (
  <div className="relative z-10 mx-auto mt-10 max-w-3xl">
    <AnimatePresence mode="wait">
      {Object.entries(faqData).map(([category, questions]) => {
        if (selected !== category) return null;
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "backIn" }}
            className="space-y-3"
          >
            {questions.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </motion.div>
        );
      })}
    </AnimatePresence>
  </div>
);

// ---------------------------------------------------------------------------
// FAQ item — sleeker card, wider + curved left accent via absolute div
// ---------------------------------------------------------------------------

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className="relative overflow-hidden rounded-2xl border border-neutral-100 bg-[#FBFBF9] shadow-[0_2px_14px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-[0_6px_24px_rgba(15,23,42,0.08)]"
    >
      {/* Custom left accent — wider, pill-shaped, fully rounded */}
      {/* <span className="absolute left-0 top-3 bottom-3 w-[5px] rounded-full bg-emerald-500" /> */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 py-4 pl-6 pr-5 text-left"
      >
        <span className="text-sm font-medium text-neutral-900 sm:text-base">
          {question}
        </span>
        <motion.span
          variants={{
            open: { rotate: "45deg" },
            closed: { rotate: "0deg" },
          }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <Plus className="h-4 w-4 text-teal-600" strokeWidth={2.5} />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : "0px",
          marginBottom: isOpen ? "14px" : "0px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden pl-6 pr-5"
      >
        <p className="text-xs leading-relaxed text-neutral-500 sm:text-sm">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Decorative dots
// ---------------------------------------------------------------------------

const FAQDots = ({ count = 3, activeIndex = 1 }) => (
  <div className="relative z-10 mt-10 flex items-center justify-center gap-2">
    {Array.from({ length: count }).map((_, i) => (
      <span
        key={i}
        className={cn(
          "rounded-full transition-all",
          i === activeIndex
            ? "h-2.5 w-2.5 bg-blue-600"
            : "h-2 w-2 bg-emerald-500/70"
        )}
      />
    ))}
  </div>
);