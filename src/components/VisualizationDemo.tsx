'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { NetworkGraph } from './NetworkGraph';
import { HolographicDashboard } from './HolographicDashboard';
import { AssetBubbles } from './AssetBubbles';
import { ParticlePortfolio } from './ParticlePortfolio';
import { PhoneMockup } from './PhoneMockup';

export function VisualizationDemo() {
  const [activeOption, setActiveOption] = useState(0);

  const options = [
    {
      id: 0,
      name: 'Original Phone',
      component: <PhoneMockup />,
      description: 'Current phone mockup with portfolio interface',
      features: ['Mobile-first design', 'Portfolio metrics', 'Simple and clean']
    },
    {
      id: 1,
      name: 'Network Graph',
      component: <NetworkGraph />,
      description: 'Cross-chain intent execution visualization',
      features: ['Real-time data flow', 'Interactive nodes', 'Protocol connections']
    },
    {
      id: 2,
      name: 'Holographic Dashboard',
      component: <HolographicDashboard />,
      description: 'Floating glassmorphism interface with AI insights',
      features: ['3D perspective', 'AI thinking simulation', 'Glassmorphism design']
    },
    {
      id: 3,
      name: 'Asset Bubbles',
      component: <AssetBubbles />,
      description: 'Interactive organic portfolio visualization',
      features: ['Physics simulation', 'Mouse interaction', 'Organic movement']
    },
    {
      id: 4,
      name: 'Particle System',
      component: <ParticlePortfolio />,
      description: 'Abstract particle formations showing portfolio evolution',
      features: ['Morphing visualizations', 'Canvas rendering', 'Artistic approach']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Hero Visual Options
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Five different high-quality design variations for the Hero section. 
          Click the tabs below to explore each option.
        </p>
      </div>

      {/* Option Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {options.map((option) => (
          <motion.button
            key={option.id}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeOption === option.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveOption(option.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.name}
          </motion.button>
        ))}
      </div>

      {/* Current Option Info */}
      <motion.div
        key={activeOption}
        className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-2">
              {options[activeOption].name}
            </h3>
            <p className="text-gray-400 mb-4">
              {options[activeOption].description}
            </p>
            <div className="flex flex-wrap gap-2">
              {options[activeOption].features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                Option {activeOption + 1}
              </div>
              <div className="text-gray-500 text-sm">of {options.length}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Visualization Container */}
      <motion.div
        key={activeOption}
        className="relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {options[activeOption].component}
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="mt-8 bg-gray-900/30 backdrop-blur-lg border border-gray-800 rounded-xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="text-white font-semibold mb-3">Instructions:</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <strong className="text-white">Network Graph:</strong> Hover over nodes to see connections. Auto-cycles through different strategies.
          </div>
          <div>
            <strong className="text-white">Holographic Dashboard:</strong> Move mouse for 3D perspective. AI thinking simulations every 5 seconds.
          </div>
          <div>
            <strong className="text-white">Asset Bubbles:</strong> Move mouse to influence physics. Click bubbles for interactions.
          </div>
          <div>
            <strong className="text-white">Particle System:</strong> Auto-morphs between formations. Mouse movement affects particles.
          </div>
        </div>
      </motion.div>
    </div>
  );
}