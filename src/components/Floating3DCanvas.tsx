import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingObject {
  mesh: THREE.Mesh;
  wireframe?: THREE.LineSegments;
  initialPos: THREE.Vector3;
  velocity: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
  floatAmplitude: THREE.Vector3;
  floatSpeed: THREE.Vector3;
  seed: number;
}

export const Floating3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 18);

    // Renderer with transparency & high-performance settings
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0x0f0f17, 2.5);
    scene.add(ambientLight);

    // Key Light: Electric Violet
    const violetLight = new THREE.DirectionalLight(0x8b5cf6, 4.5);
    violetLight.position.set(10, 12, 10);
    scene.add(violetLight);

    // Rim Light: Cyan / Indigo Accent
    const cyanLight = new THREE.DirectionalLight(0x06b6d4, 3.2);
    cyanLight.position.set(-12, -8, 8);
    scene.add(cyanLight);

    // Point Light near center for soft surface specular
    const centerGlow = new THREE.PointLight(0xa78bfa, 2.5, 30);
    centerGlow.position.set(0, 0, 5);
    scene.add(centerGlow);

    // Geometries collection for agency-grade tactile shapes
    const geometries: THREE.BufferGeometry[] = [
      new THREE.IcosahedronGeometry(1.1, 0),       // 20-sided faceted crystal
      new THREE.OctahedronGeometry(1.2, 0),        // Diamond octahedron
      new THREE.DodecahedronGeometry(1.0, 0),      // 12-sided polyhedron
      new THREE.TorusGeometry(0.9, 0.32, 16, 40),  // Elegant torus ring
      new THREE.TetrahedronGeometry(1.2, 0),       // Sharp pyramid
      new THREE.TorusKnotGeometry(0.7, 0.22, 64, 12), // Compact twisted knot
      new THREE.CylinderGeometry(0.5, 0.5, 1.4, 6), // Hexagonal pill
    ];

    // Shared high-end dark luxury materials
    const darkMetallicMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x181820,
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });

    const violetReflectiveMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x221338,
      emissive: 0x1d0b36,
      emissiveIntensity: 0.3,
      metalness: 0.88,
      roughness: 0.26,
      clearcoat: 0.9,
      clearcoatRoughness: 0.2,
    });

    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.35,
    });

    const materials = [darkMetallicMaterial, violetReflectiveMaterial];

    // Create 12 distributed 3D objects moving in varied directions
    const floatingObjects: FloatingObject[] = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const geom = geometries[i % geometries.length];
      const mat = materials[i % materials.length];

      const mesh = new THREE.Mesh(geom, mat);

      // Random starting position spread behind hero text
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 13;
      const z = (Math.random() - 0.5) * 8 - 2; // Keep slightly recessed behind z=0 text plane
      mesh.position.set(x, y, z);

      // Random scale for natural depth perspective
      const scale = 0.55 + Math.random() * 0.65;
      mesh.scale.set(scale, scale, scale);

      // Optional crisp edge wireframe overlay on selected shapes
      let wireframe: THREE.LineSegments | undefined;
      if (i % 2 === 0) {
        const wireframeGeom = new THREE.EdgesGeometry(geom);
        wireframe = new THREE.LineSegments(wireframeGeom, wireframeMaterial);
        mesh.add(wireframe);
      }

      scene.add(mesh);

      // Unique velocity vector: objects drift slowly in every direction (360° spread)
      const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.4);
      const speed = prefersReducedMotion ? 0 : 0.003 + Math.random() * 0.004;

      floatingObjects.push({
        mesh,
        wireframe,
        initialPos: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          (Math.random() - 0.5) * speed * 0.6
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.006
        ),
        floatAmplitude: new THREE.Vector3(
          0.8 + Math.random() * 0.8,
          0.8 + Math.random() * 0.8,
          0.5 + Math.random() * 0.5
        ),
        floatSpeed: new THREE.Vector3(
          0.3 + Math.random() * 0.4,
          0.3 + Math.random() * 0.4,
          0.2 + Math.random() * 0.3
        ),
        seed: Math.random() * 100,
      });
    }

    // Subtle interactive mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 1.5;
      mouseY = y * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Boundary constraints for smooth wrapping
    const bounds = {
      x: 14,
      y: 9,
      zMin: -7,
      zMax: 3,
    };

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Camera gentle smooth damping towards mouse
      targetCameraX += (mouseX - targetCameraX) * 0.03;
      targetCameraY += (mouseY - targetCameraY) * 0.03;
      camera.position.x = targetCameraX;
      camera.position.y = targetCameraY;
      camera.lookAt(0, 0, 0);

      // Update 3D floating objects
      for (const obj of floatingObjects) {
        if (!prefersReducedMotion) {
          // Slow translation in its direction vector
          obj.mesh.position.x += obj.velocity.x;
          obj.mesh.position.y += obj.velocity.y;
          obj.mesh.position.z += obj.velocity.z;

          // Harmonic floating oscillation
          const harmonicX = Math.sin(elapsedTime * obj.floatSpeed.x + obj.seed) * 0.002;
          const harmonicY = Math.cos(elapsedTime * obj.floatSpeed.y + obj.seed) * 0.002;
          obj.mesh.position.x += harmonicX;
          obj.mesh.position.y += harmonicY;

          // Continuous slow rotation
          obj.mesh.rotation.x += obj.rotationSpeed.x;
          obj.mesh.rotation.y += obj.rotationSpeed.y;
          obj.mesh.rotation.z += obj.rotationSpeed.z;

          // Seamless boundary wrapping across all directions
          if (obj.mesh.position.x > bounds.x) obj.mesh.position.x = -bounds.x;
          if (obj.mesh.position.x < -bounds.x) obj.mesh.position.x = bounds.x;
          if (obj.mesh.position.y > bounds.y) obj.mesh.position.y = -bounds.y;
          if (obj.mesh.position.y < -bounds.y) obj.mesh.position.y = bounds.y;
          if (obj.mesh.position.z > bounds.zMax) obj.mesh.position.z = bounds.zMin;
          if (obj.mesh.position.z < bounds.zMin) obj.mesh.position.z = bounds.zMax;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects
      for (const geom of geometries) {
        geom.dispose();
      }
      darkMetallicMaterial.dispose();
      violetReflectiveMaterial.dispose();
      wireframeMaterial.dispose();

      for (const obj of floatingObjects) {
        if (obj.wireframe) {
          obj.wireframe.geometry.dispose();
        }
      }

      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  );
};
