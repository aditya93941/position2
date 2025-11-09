"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./FAQAccordion.module.css";

interface FAQItem {
  question: string;
  answer: string;
  description?: string;
}

const faqs: FAQItem[] = [
  {
    question: "Our team already uses a similar tool. Why switch to Studio<sup>X</sup>?",
    answer: "Studio<sup>X</sup> is purpose-built for industries where precision visuals define product adoption.",
    description:
      "Computing devices, rugged PCs, smartphones, smart devices, and next-gen displays all demand top-tier visuals. Studio<sup>X</sup> includes custom controls, lighting presets, and rendering features designed to showcase specs and design details that matter most to your customers.",
  },
  {
    question: "We only have a few products. Is Studio<sup>X</sup> still a good fit?",
    answer: "Absolutely. If anything, that makes it even more valuable.",
    description:
      "A smaller product line often means a leaner marketing team—and less room for error or delays. Studio<sup>X</sup> helps you get high-quality visuals out faster, without needing a big team or agency. It’s an on-demand, self-serve way to amplify your product story with less overhead.",
  },
  {
    question: "There are already off-the-shelf 3D tools out there. Why choose Studio<sup>X</sup>?",
    answer: "Most off-the-shelf tools are generalized and not optimized for hardware visualization.",
    description:
      "Studio<sup>X</sup> is engineered specifically for high-precision renders that bring out industrial design and material detail, ensuring your visuals truly reflect product quality.",
  },
  {
    question: "Product photography isn’t a problem for us. What value does Studio<sup>X</sup> add?",
    answer: "Studio<sup>X</sup> complements, not replaces, product photography.",
    description:
      "It gives you full control over angles, lighting, and variants—making it faster and more flexible than reshooting every product update.",
  },
  {
    question: "Studio<sup>X</sup> sounds great, but it might be an added expense. Is it worth it?",
    answer: "Yes — because Studio<sup>X</sup> reduces long-term content production costs.",
    description:
      "You can reuse 3D assets across campaigns, eliminate repeated photoshoots, and publish interactive visuals instantly — saving both time and money.",
  },
];

const FAQAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ✅ Open first accordion on mount
  useEffect(() => {
    if (contentRefs.current[0]) {
      contentRefs.current[0].style.height =
        contentRefs.current[0].scrollHeight + "px";
    }
  }, []);

  const toggleFAQ = (index: number) => {
    if (activeIndex === index) {
      const current = contentRefs.current[index];
      if (current) current.style.height = "0px";
      setActiveIndex(null);
    } else {
      if (activeIndex !== null && contentRefs.current[activeIndex]) {
        contentRefs.current[activeIndex]!.style.height = "0px";
      }
      const next = contentRefs.current[index];
      if (next) next.style.height = next.scrollHeight + "px";
      setActiveIndex(index);
    }
  };

  return (
    <section className={styles.faqSection} aria-labelledby="faq-heading">
      <div className="container">
        <h2 className={styles.title} id="faq-heading">Frequently Asked Questions</h2>
        <div className={styles.accordion}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.item} ${activeIndex === index ? styles.active : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span dangerouslySetInnerHTML={{ __html: faq.question }} />
                {activeIndex === index ? (
                  <ChevronUp className={styles.icon} aria-hidden="true" />
                ) : (
                  <ChevronDown className={styles.icon} aria-hidden="true" />
                )}
              </button>

              <div
                className={styles.answer}
                ref={(el :any) => (contentRefs.current[index] = el)}
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div className={styles.textWrapper}>
                  <p
                    className={styles.answerShort}
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                  {faq.description && (
                    <p
                      className={styles.answerDesc}
                      dangerouslySetInnerHTML={{ __html: faq.description }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
