'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Box, 
  Sphere, 
  Html, 
  OrbitControls, 
  Environment, 
  Sparkles,
  Float,
  MeshTransmissionMaterial
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { TrendingUp, TrendingDown, Shield, Zap, DollarSign, Clock } from 'lucide-react';

// Floating coin component
function FloatingCoin({ position, color, delay = 0 }: { position: [number, number, number], color: string, delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + delay) * 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

// Main vault component
function Vault() {
  const vaultRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Mesh>(null);
  const [isOpen, setIsOpen] = useState(false);

  useFrame((state) => {
    if (vaultRef.current) {
      vaultRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    if (lidRef.current) {
      lidRef.current.rotation.x = isOpen ? -Math.PI * 0.3 : 0;
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={vaultRef} position={[0, -0.5, 0]}>
      {/* Vault Base */}
      <Box args={[2, 1.5, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.1}
        />
      </Box>
      
      {/* Vault Lid */}
      <Box 
        ref={lidRef} 
        args={[2.1, 0.3, 1.6]} 
        position={[0, 0.9, 0]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.9} 
          roughness={0.1}
        />
      </Box>

      {/* Lock */}
      <Sphere args={[0.15]} position={[0.8, 0.2, 0.76]}>
        <meshStandardMaterial color="#ffd700" metalness={1} roughness={0} />
      </Sphere>

      {/* Handle */}
      <Box args={[0.1, 0.3, 0.05]} position={[0.9, 0.2, 0.76]}>
        <meshStandardMaterial color="#ffd700" metalness={1} roughness={0} />
      </Box>

      {/* Floating Coins */}
      <FloatingCoin position={[0.3, 1.8, 0.2]} color="#f59e0b" delay={0} />
      <FloatingCoin position={[-0.4, 2.0, -0.1]} color="#3b82f6" delay={1} />
      <FloatingCoin position={[0.6, 2.2, -0.3]} color="#10b981" delay={2} />
      <FloatingCoin position={[-0.2, 2.4, 0.4]} color="#8b5cf6" delay={3} />

      {/* AI Core (Glowing orb inside vault) */}
      {isOpen && (
        <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
          <Sphere args={[0.3]} position={[0, 0.3, 0]}>
            <MeshTransmissionMaterial
              color="#8b5cf6"
              thickness={0.5}
              roughness={0}
              transmission={0.9}
              ior={1.5}
              chromaticAberration={0.02}
              backside
            />
          </Sphere>
        </Float>
      )}

      {/* Sparkles effect */}
      <Sparkles 
        count={30} 
        scale={[4, 3, 4]} 
        size={2} 
        speed={0.5}
        color="#8b5cf6"
      />
    </group>
  );
}

// Data visualization component
function DataViz() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={[3, 1, 0]}>
      {/* Floating data panels */}
      <Html
        position={[0, 1, 0]}
        transform
        occlude
        style={{
          transition: 'all 0.3s',
          transform: 'scale(0.5)',
        }}
      >
        <div className="bg-gray-900/90 backdrop-blur-lg border border-purple-500/30 rounded-lg p-4 text-white min-w-48">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Portfolio Value</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-xl font-bold text-green-400">$124,567.89</div>
          <div className="text-xs text-gray-500">+12.4% APR</div>
        </div>
      </Html>

      <Html
        position={[0, -0.5, 0]}
        transform
        occlude
        style={{
          transition: 'all 0.3s',
          transform: 'scale(0.5)',
        }}
      >
        <div className="bg-gray-900/90 backdrop-blur-lg border border-blue-500/30 rounded-lg p-4 text-white min-w-48">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Risk Score</span>
            <Shield className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-blue-400">4.2/10</div>
          <div className="text-xs text-gray-500">Low Volatility</div>
        </div>
      </Html>

      <Html
        position={[0, -2, 0]}
        transform
        occlude
        style={{
          transition: 'all 0.3s',
          transform: 'scale(0.5)',
        }}
      >
        <div className="bg-gray-900/90 backdrop-blur-lg border border-green-500/30 rounded-lg p-4 text-white min-w-48">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">24h Earnings</span>
            <DollarSign className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-xl font-bold text-green-400">+$342.18</div>
          <div className="text-xs text-gray-500">While you sleep</div>
        </div>
      </Html>
    </group>
  );
}

// Background environment
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <spotLight 
        position={[0, 10, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1}
        castShadow
      />
      
      <Vault />
      <DataViz />
      
      <Environment preset="city" />
    </>
  );
}

export function TreasuryVault() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[600px] bg-gray-900/50 rounded-2xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative w-full h-[600px] rounded-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [8, 3, 8], fov: 50 }}
        className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20"
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top badges */}
        <motion.div
          className="absolute top-6 left-6 bg-gray-900/80 backdrop-blur-lg border border-green-500/30 rounded-full px-4 py-2 flex items-center space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm font-medium">AI Active</span>
        </motion.div>

        <motion.div
          className="absolute top-6 right-6 bg-gray-900/80 backdrop-blur-lg border border-blue-500/30 rounded-full px-4 py-2 flex items-center space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Shield className="w-4 h-4 text-blue-400" />
          <span className="text-blue-400 text-sm font-medium">Secure</span>
        </motion.div>

        {/* Bottom info */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur-lg border border-purple-500/30 rounded-2xl px-6 py-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-white text-sm font-medium">Earning 24/7</span>
            </div>
            <div className="text-purple-400 text-xs">Non-custodial • Low volatility • AI optimized</div>
          </div>
        </motion.div>

        {/* Performance metrics */}
        <motion.div
          className="absolute top-20 left-6 space-y-3"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 }}
        >
          <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 min-w-[160px]">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs">Max Drawdown</span>
              <TrendingDown className="w-3 h-3 text-green-400" />
            </div>
            <div className="text-white text-sm font-bold">4.2%</div>
            <div className="text-green-400 text-xs">vs 15% market avg</div>
          </div>

          <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 min-w-[160px]">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs">Uptime</span>
              <Zap className="w-3 h-3 text-blue-400" />
            </div>
            <div className="text-white text-sm font-bold">99.9%</div>
            <div className="text-blue-400 text-xs">Always working</div>
          </div>
        </motion.div>
      </div>

      {/* Floating interaction hint */}
      <motion.div
        className="absolute bottom-20 right-6 text-gray-400 text-xs flex items-center space-x-1"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Drag to explore</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      </motion.div>
    </motion.div>
  );
}