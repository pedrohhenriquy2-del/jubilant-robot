import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "../constants";

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-beige">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-ink font-medium">{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-gold"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-ink-soft leading-relaxed text-left">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-10 md:py-16 bg-white border-y border-beige">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <motion.div
          className="text-center mb-8"
        >
          <span className="inline-block text-[11px] md:text-xs uppercase tracking-[0.22em] text-gold font-semibold mb-2">
            Dúvidas frequentes
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-ink">
            Perguntas frequentes
          </h2>
        </motion.div>

        <motion.div
        >
          {FAQ_ITEMS.slice(0, 4).map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? -1 : index)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
