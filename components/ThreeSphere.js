"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeSphere({ size = 420, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 4;

    const geo = new THREE.IcosahedronGeometry(1.5, 6);
    const mat = new THREE.MeshPhongMaterial({ color: 0x1847d4, emissive: 0x0a1a5c, shininess: 80, transparent: true, opacity: 0.85 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const wfGeo = new THREE.IcosahedronGeometry(1.52, 2);
    const wfMat = new THREE.MeshBasicMaterial({ color: 0x00c4e0, wireframe: true, transparent: true, opacity: 0.25 });
    const wf = new THREE.Mesh(wfGeo, wfMat);
    scene.add(wf);

    const ringGeo = new THREE.TorusGeometry(2.2, 0.02, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00c4e0, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.3;
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(2.6, 0.01, 8, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x4f46e5, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI * 0.15;
    ring2.rotation.y = Math.PI * 0.5;
    scene.add(ring2);

    const pGeo = new THREE.BufferGeometry();
    const pCount = 220;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.2;
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.04, color: 0x00c4e0, transparent: true, opacity: 0.8 });
    const pts = new THREE.Points(pGeo, pMat);
    scene.add(pts);

    const light = new THREE.DirectionalLight(0x1847d4, 2);
    light.position.set(5, 5, 5);
    scene.add(light);
    const light2 = new THREE.DirectionalLight(0x00c4e0, 1.5);
    light2.position.set(-5, -3, -5);
    scene.add(light2);
    scene.add(new THREE.AmbientLight(0x0d1a3a, 2));

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.01 });
    io.observe(canvas);

    function animate() {
      raf = requestAnimationFrame(animate);
      if (!visible || document.hidden) return;
      const t = Date.now() * 0.001;
      mesh.rotation.y = t * 0.4;
      mesh.rotation.x = t * 0.15;
      wf.rotation.y = -t * 0.3;
      wf.rotation.x = t * 0.1;
      ring.rotation.z = t * 0.5;
      ring2.rotation.z = -t * 0.3;
      pts.rotation.y = t * 0.2;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      [geo, mat, wfGeo, wfMat, ringGeo, ringMat, ring2Geo, ring2Mat, pGeo, pMat].forEach((r) => r.dispose());
      renderer.dispose();
    };
  }, [size]);

  return <canvas ref={canvasRef} width={size} height={size} className={className} aria-hidden="true" />;
}
