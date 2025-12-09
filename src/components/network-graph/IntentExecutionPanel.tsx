'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface IntentExecutionPanelProps {
  isMobile: boolean;
  isExecuting: boolean;
  executionProgress: number;
  currentFlowData: {
    name: string;
    userIntent: string;
    value: string;
    apy: string;
    executionTime: string;
    gasOptimized: string;
  };
}

export function IntentExecutionPanel({
  isMobile,
  isExecuting,
  executionProgress,
  currentFlowData,
}: IntentExecutionPanelProps) {
  return (
    <motion.div
      key={currentFlowData.name}
      className={`absolute ${isMobile ? 'bottom-3 left-3 right-3 p-2' : 'bottom-4 left-4 right-4 p-3'} bg-gray-900/95 backdrop-blur-lg border border-purple-500/30 rounded-xl shadow-2xl`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <h3 className="text-white font-bold text-xs">Intent Execution</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              isExecuting ? 'bg-yellow-400' : 'bg-green-400'
            }`}
          />
          <span
            className={`text-xs font-medium ${isExecuting ? 'text-yellow-400' : 'text-green-400'}`}
          >
            {isExecuting ? 'Executing' : 'Ready'}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-2 lg:space-y-0">
        {/* User Intent - Compact */}
        <div className="flex-1 bg-purple-500/10 rounded-lg p-2 border border-purple-500/20">
          <div className="text-purple-300 text-xs font-medium mb-1">Intent</div>
          <div className="text-white text-xs italic truncate">{currentFlowData.userIntent}</div>
        </div>

        {/* Execution Details - Horizontal */}
        <div className="flex space-x-2 lg:space-x-3">
          <div className="bg-gray-800/50 rounded-lg p-2 min-w-[60px]">
            <div className="text-gray-300 text-xs">Value</div>
            <div className="text-white font-bold text-xs">{currentFlowData.value}</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-2 min-w-[50px]">
            <div className="text-gray-300 text-xs">APY</div>
            <div className="text-green-400 font-bold text-xs">{currentFlowData.apy}</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-2 min-w-[50px]">
            <div className="text-gray-300 text-xs">Time</div>
            <div className="text-blue-400 font-bold text-xs">{currentFlowData.executionTime}</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-2 min-w-[50px]">
            <div className="text-gray-300 text-xs">Gas</div>
            <div className="text-purple-400 font-bold text-xs">{currentFlowData.gasOptimized}</div>
          </div>
        </div>

        {/* Execution Progress - Compact */}
        {isExecuting && (
          <div className="flex items-center space-x-2 min-w-[100px]">
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${executionProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="text-white text-xs font-medium">{Math.round(executionProgress)}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
