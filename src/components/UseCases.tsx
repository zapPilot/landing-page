'use client';

import { motion } from 'framer-motion';
import { TabbedUseCase } from './use-case';
import { SectionHeader } from './layout';
import { regimes } from '@/lib/regimeData';
import { transformRegimesToUseCases } from '@/lib/regimeTransformers';
import { REGIME_VISUALIZER_CONFIG } from '@/config/regimeVisualizerConfig';

export function UseCases() {
  const tabbedUseCases = transformRegimesToUseCases(regimes);
  const { slideIn } = REGIME_VISUALIZER_CONFIG.animation;

  return (
    <section id="use-cases" className="py-24 bg-gray-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={
            <>
              Use
              <span className="ml-3">Cases</span>
            </>
          }
          subtitle="Real scenarios where Zap Pilot keeps you disciplined"
        />

        <div className="space-y-12">
          {tabbedUseCases.map((useCase, index) => (
            <motion.div
              key={useCase.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: slideIn.duration, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <TabbedUseCase
                number={useCase.number}
                regime={useCase.regime}
                regimeBadge={useCase.regimeBadge}
                gradient={useCase.gradient}
                variants={useCase.variants}
                icon={useCase.icon}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: slideIn.duration, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl text-gray-300 mb-6">Let market sentiment guide your decisions.</p>
          <p className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Zap Pilot handles the gradual execution — entirely within your wallet.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
