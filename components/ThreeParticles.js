"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeParticles({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const geometry = new THREE.BufferGeometry();
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      const t = Math.random();
      colors[i * 3] = t * 0.1;
      colors[i * 3 + 1] = t * 0.3 + 0.3;
      colors[i * 3 + 2] = t * 0.4 + 0.6;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const sphereGeo = new THREE.IcosahedronGeometry(12, 1);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x1847d4, wireframe: true, transparent: true, opacity: 0.07 });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(12, 0, -10);
    scene.add(sphere);

    const sphere2Geo = new THREE.IcosahedronGeometry(8, 1);
    const sphere2Mat = new THREE.MeshBasicMaterial({ color: 0x00c4e0, wireframe: true, transparent: true, opacity: 0.06 });
    const sphere2 = new THREE.Mesh(sphere2Geo, sphere2Mat);
    sphere2.position.set(-14, 5, -15);
    scene.add(sphere2);

    let mouseX = 0, mouseY = 0;
    function onMove(e) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    }
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.01 });
    io.observe(canvas);

    function animate() {
      raf = requestAnimationFrame(animate);
      if (!visible || document.hidden) return;
      const t = Date.now() * 0.0003;
      particles.rotation.y = t * 0.1 + mouseX * 0.3;
      particles.rotation.x = mouseY * 0.2;
      sphere.rotation.y = t * 0.4;
      sphere.rotation.x = t * 0.2;
      sphere2.rotation.y = -t * 0.3;
      sphere2.rotation.z = t * 0.15;
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      sphere2Geo.dispose();
      sphere2Mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} aria-hidden="true" />;
}
