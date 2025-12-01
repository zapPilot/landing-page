'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionHeader } from '@/components/ui';

const faqs = [
  {
    question: 'Is this a fund?',
    answer:
      'No. We never custody assets. You hold your keys in your own wallet (MetaMask, Rabby, etc.), we provide strategy suggestions. All funds stay in your control 24/7.',
  },
  {
    question: 'Does it auto-execute trades?',
    answer:
      'Never. Every transaction requires your manual signature in your wallet. You review the route, gas estimates, and expected outcomes before deciding. If you disagree, simply ignore the suggestion.',
  },
  {
    question: "What's the catch?",
    answer:
      "No catch. We're transparent: you pay gas fees for on-chain transactions (standard for all DeFi). We may charge subscription fees in the future, but we'll announce pricing clearly before launch.",
  },
  {
    question: 'Why only BTC/ETH?',
    answer:
      'Long-term beta exposure with established liquidity and proven track records. Altcoins add complexity, regulatory risk, and volatility. We focus on the simplest, most battle-tested crypto assets for rules-based allocation.',
  },
  {
    question: 'What if I disagree with a suggestion?',
    answer:
      "Simply ignore it. Our suggestions are not mandatory—they're guidance based on sentiment rules. You're free to execute, modify, or reject any recommendation. You always have final control.",
  },
  {
    question: 'How is this different from trading bots?',
    answer:
      'Bots auto-trade and often custody funds (huge risk). We calculate routes and present them to you—but we never execute without your signature. Think of it as a GPS: we show the route, you drive the car.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Frequently Asked " highlight="Questions" />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl px-6 py-4">
            <p className="text-gray-400">
              Still have questions?{' '}
              <a
                href="mailto:support@zappilot.com"
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                Contact our team
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
