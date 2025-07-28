// apps/frontend/src/components/solver/Cube3DViewer.tsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Cube3DViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = containerRef.current?.clientWidth || 300;
    const height = 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(width, height);
    containerRef.current?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const materials = [
      new THREE.MeshBasicMaterial({ color: "white" }),
      new THREE.MeshBasicMaterial({ color: "yellow" }),
      new THREE.MeshBasicMaterial({ color: "green" }),
      new THREE.MeshBasicMaterial({ color: "blue" }),
      new THREE.MeshBasicMaterial({ color: "orange" }),
      new THREE.MeshBasicMaterial({ color: "red" }),
    ];
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-[300px]" />;
};

export default Cube3DViewer;
