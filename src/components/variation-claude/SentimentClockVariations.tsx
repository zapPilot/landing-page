'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { ANIMATIONS } from '@/lib/constants';
import { type RegimeId, getRegimeById } from './shared/regimeData';
import { useAutoPlay } from './shared/useAutoPlay';
import SentimentClockOrbital from './clocks/SentimentClockOrbital';
import SentimentClockRibbon from './clocks/SentimentClockRibbon';
import SentimentClockPendulum from './clocks/SentimentClockPendulum';
import SentimentClockPathway from './clocks/SentimentClockPathway';
import { Play, Pause } from 'lucide-react';

type Variation = 'orbital' | 'ribbon' | 'pendulum' | 'pathway';

const variations: { id: Variation; label: string; description: string }[] = [
  {
    id: 'orbital',
    label: 'Orbital',
    description: 'Ring with visible gap between extremes',
  },
  {
    id: 'ribbon',
    label: 'Ribbon',
    description: 'Linear gradient spectrum',
  },
  {
    id: 'pendulum',
    label: 'Pendulum',
    description: 'Physics-based swing',
  },
  {
    id: 'pathway',
    label: 'Pathway',
    description: 'Node graph with locks',
  },
];

export default function SentimentClockVariations() {
  const [activeVariation, setActiveVariation] = useState<Variation>('orbital');
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  const { currentRegimeId, isPaused, pause, resume, goToRegime } = useAutoPlay({
    enabled: autoPlayEnabled,
    intervalMs: 6000,
  });

  const activeRegime = getRegimeById(currentRegimeId);

  const handleRegimeChange = (regime: RegimeId) => {
    goToRegime(regime);
  };

  const toggleAutoPlay = () => {
    setAutoPlayEnabled(!autoPlayEnabled);
    if (!autoPlayEnabled) {
      resume();
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Sentiment "
          highlight="Clock"
          subtitle="5 regimes based on market emotion—not price predictions"
        />

        {/* Variation Tabs */}
        <motion.div
          initial={ANIMATIONS.fadeInUp.initial}
          whileInView={ANIMATIONS.fadeInUp.animate}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 p-2 bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl">
            {variations.map((variation) => (
              <button
                key={variation.id}
                onClick={() => setActiveVariation(variation.id)}
                className={`
                  relative px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300
                  ${
                    activeVariation === variation.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-gray-300'
                  }
                `}
              >
                {activeVariation === variation.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{variation.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Variation Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeVariation}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center text-sm text-gray-500 mb-8"
          >
            {variations.find((v) => v.id === activeVariation)?.description}
          </motion.p>
        </AnimatePresence>

        {/* Auto-Play Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <button
            onClick={toggleAutoPlay}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300
              ${
                autoPlayEnabled
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }
            `}
          >
            {autoPlayEnabled ? (
              <>
                <Pause size={16} />
                <span>Auto-play ON</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>Auto-play OFF</span>
              </>
            )}
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-[55%_45%] gap-12 items-start">
          {/* Clock Visualization */}
          <motion.div
            initial={ANIMATIONS.fadeInUp.initial}
            whileInView={ANIMATIONS.fadeInUp.animate}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVariation}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                {activeVariation === 'orbital' && (
                  <SentimentClockOrbital
                    activeRegime={currentRegimeId}
                    onRegimeChange={handleRegimeChange}
                    isPaused={isPaused}
                  />
                )}
                {activeVariation === 'ribbon' && (
                  <SentimentClockRibbon
                    activeRegime={currentRegimeId}
                    onRegimeChange={handleRegimeChange}
                    isPaused={isPaused}
                  />
                )}
                {activeVariation === 'pendulum' && (
                  <SentimentClockPendulum
                    activeRegime={currentRegimeId}
                    onRegimeChange={handleRegimeChange}
                    isPaused={isPaused}
                  />
                )}
                {activeVariation === 'pathway' && (
                  <SentimentClockPathway
                    activeRegime={currentRegimeId}
                    onRegimeChange={handleRegimeChange}
                    isPaused={isPaused}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Details Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRegimeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: activeRegime.fillColor }}
                />
                <h3 className="text-2xl font-bold">{activeRegime.label}</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: activeRegime.fillColor }}
                  >
                    {activeRegime.allocation.crypto}%
                  </span>
                  <span className="text-gray-400">crypto</span>
                  <span className="text-gray-600 mx-2">/</span>
                  <span
                    className="text-4xl font-bold"
                    style={{ color: activeRegime.fillColor }}
                  >
                    {activeRegime.allocation.stable}%
                  </span>
                  <span className="text-gray-400">stable</span>
                </div>
                <p className="text-sm text-gray-500 italic">{activeRegime.emotionalState}</p>
              </div>

              <div className="mb-6">
                <p
                  className="text-lg italic mb-4"
                  style={{ color: activeRegime.fillColor }}
                >
                  {activeRegime.philosophy}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">ACTIONS</h4>
                <ul className="space-y-2">
                  {activeRegime.actions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span
                        className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: activeRegime.fillColor }}
                      />
                      <span className="text-sm text-gray-300">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-800">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">WHY THIS WORKS</h4>
                <p className="text-sm text-gray-400">{activeRegime.whyThisWorks}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Keyboard hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-600 mt-8"
        >
          Switch variations to compare • {autoPlayEnabled ? 'Auto-play demos each regime' : 'Click to explore regimes'}
        </motion.p>
      </div>
    </section>
  );
}
