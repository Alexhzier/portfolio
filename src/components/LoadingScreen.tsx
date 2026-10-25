import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { portfolioData } from '../content/portfolio-data';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Progressive timer counting from 0 to 100%
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 28);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  // Three.js 3D Gyroscopic Aesthetic Sphere Scene
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = 240;
    const height = 240;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x181825, 2.0);
    scene.add(ambientLight);

    const violetLight = new THREE.DirectionalLight(0x8b5cf6, 4.5);
    violetLight.position.set(5, 6, 6);
    scene.add(violetLight);

    const cyanLight = new THREE.DirectionalLight(0x06b6d4, 3.5);
    cyanLight.position.set(-6, -4, 4);
    scene.add(cyanLight);

    const centerGlow = new THREE.PointLight(0xa78bfa, 2.0, 15);
    centerGlow.position.set(0, 0, 3);
    scene.add(centerGlow);

    // 1. Outer Gyro Ring (Torus)
    const outerRingGeo = new THREE.TorusGeometry(2.1, 0.045, 16, 64);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.2,
      metalness: 0.9,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    scene.add(outerRing);

    // 2. Middle Orbital Ring (Torus tilted orthogonally)
    const middleRingGeo = new THREE.TorusGeometry(1.65, 0.038, 16, 64);
    const middleRingMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      roughness: 0.25,
      metalness: 0.85,
    });
    const middleRing = new THREE.Mesh(middleRingGeo, middleRingMat);
    middleRing.rotation.x = Math.PI / 3;
    middleRing.rotation.y = Math.PI / 4;
    scene.add(middleRing);

    // 3. Central Faceted Crystal Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x121217,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Wireframe Cage over Core
    const wireGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.87, 0));
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xc4b5fd,
      transparent: true,
      opacity: 0.7,
    });
    const wireCage = new THREE.LineSegments(wireGeo, wireMat);
    core.add(wireCage);

    // 4. Stardust Particles Cloud
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xa5b4fc,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      outerRing.rotation.x += 0.012;
      outerRing.rotation.y += 0.016;

      middleRing.rotation.y -= 0.018;
      middleRing.rotation.z += 0.014;

      core.rotation.x += 0.008;
      core.rotation.y += 0.012;

      particles.rotation.y += 0.004;
      particles.rotation.x += 0.002;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      middleRingGeo.dispose();
      middleRingMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Geometry calculations for SVG Circular Loader
  const radius = 126;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Leading bead coordinate on circle
  const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2;
  const beadX = 140 + radius * Math.cos(angle);
  const beadY = 140 + radius * Math.sin(angle);

  // Dynamic telemetry status string
  const getStatusText = (pct: number) => {
    if (pct < 25) return 'INITIALIZING 3D ENVIRONMENT';
    if (pct < 55) return 'COMPILING SHADERS & ASSETS';
    if (pct < 80) return 'MOUNTING SYSTEM TELEMETRY';
    if (pct < 100) return 'CALIBRATING VIEWPORT';
    return 'SYSTEM READY';
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.02,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-zinc-100 select-none overflow-hidden px-4"
    >
      {/* Dynamic 3D ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-gradient-to-tr from-violet-600/20 via-cyan-500/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        
        {/* Top Header Identity */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center mb-6"
        >
          <div className="relative mb-3 group">
            <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 shadow-xl shadow-violet-600/30">
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 border border-black">
                <img
                  src="/profile.png"
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-cover object-center filter brightness-[1.03]"
                />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#09090b] shadow flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white font-sans">
            {portfolioData.personal.name}
          </h2>
          <span className="text-[11px] font-mono text-violet-400 tracking-wide mt-0.5">
            {portfolioData.personal.role}
          </span>
        </motion.div>

        {/* 3D Circular Loader Portal */}
        <div className="relative w-[280px] h-[280px] flex items-center justify-center my-2">
          
          {/* Subtle Outer Rotating Dash Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-white/[0.08] animate-[spin_24s_linear_infinite] pointer-events-none" />
          <div className="absolute inset-3 rounded-full border border-dotted border-violet-500/20 animate-[spin_18s_linear_infinite_reverse] pointer-events-none" />

          {/* Three.js 3D Gyroscopic Canvas */}
          <div 
            ref={canvasContainerRef} 
            className="absolute inset-5 rounded-full overflow-hidden pointer-events-none flex items-center justify-center"
          />

          {/* SVG Circular Progress Track & Bead */}
          <svg
            viewBox="0 0 280 280"
            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_16px_rgba(139,92,246,0.25)]"
          >
            <defs>
              <linearGradient id="circleProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Background Track Circle */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="3.5"
            />

            {/* Radar Circular Ticks */}
            {Array.from({ length: 36 }).map((_, i) => {
              const tickAngle = (i * 10 * Math.PI) / 180;
              const innerR = 133;
              const outerR = 137;
              const x1 = 140 + innerR * Math.cos(tickAngle);
              const y1 = 140 + innerR * Math.sin(tickAngle);
              const x2 = 140 + outerR * Math.cos(tickAngle);
              const y2 = 140 + outerR * Math.sin(tickAngle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={i % 3 === 0 ? "rgba(139, 92, 246, 0.4)" : "rgba(255, 255, 255, 0.12)"}
                  strokeWidth={i % 3 === 0 ? "1.5" : "0.75"}
                />
              );
            })}

            {/* Dynamic Active Circular Progress Arc */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke="url(#circleProgressGrad)"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-75 ease-out"
              transform="rotate(-90 140 140)"
            />

            {/* Glowing Leading Head Bead */}
            {progress > 0 && (
              <g>
                <circle
                  cx={beadX}
                  cy={beadY}
                  r="7"
                  fill="#06b6d4"
                  className="animate-pulse"
                  opacity="0.4"
                />
                <circle
                  cx={beadX}
                  cy={beadY}
                  r="4"
                  fill="#38bdf8"
                />
                <circle
                  cx={beadX}
                  cy={beadY}
                  r="2"
                  fill="#ffffff"
                />
              </g>
            )}
          </svg>

          {/* Centered Monospace Percentage Counter Floating Badge */}
          <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none">
            <div className="px-3.5 py-1 rounded-full bg-zinc-950/75 border border-white/15 backdrop-blur-md shadow-2xl shadow-black/80 flex items-center justify-center">
              <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white tabular-nums">
                {progress}
                <span className="text-xs text-violet-400 font-normal ml-0.5">%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Telemetry Status Footer */}
        <div className="mt-5 space-y-2 w-full">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
            <span className="text-[11px] font-mono tracking-wider text-zinc-300 uppercase">
              {getStatusText(progress)}
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-zinc-500 pt-1">
            <span>WEBGL 3D</span>
            <span>•</span>
            <span>PHT (UTC+8)</span>
            <span>•</span>
            <span className="text-emerald-400">ONLINE</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
