// apps/frontend/src/components/solver/Cube3DViewer.tsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Cube3DViewerProps {
  cubeState?: any;
  showSolution?: boolean;
  solutionStep?: number;
}

const Cube3DViewer: React.FC<Cube3DViewerProps> = ({ 
  cubeState, 
  showSolution = false, 
  solutionStep = 0 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const groupRef = useRef<THREE.Group>();

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 400;
    const height = 400;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create Rubik's cube
    const cubeGroup = new THREE.Group();
    groupRef.current = cubeGroup;
    scene.add(cubeGroup);

    // Create individual cubelets (3x3x3 = 27 pieces)
    const cubeSize = 0.9;
    const gap = 0.05;
    const totalSize = cubeSize + gap;

    // Define colors for each face
    const colors = {
      white: 0xffffff,   // Top (U)
      yellow: 0xffff00,  // Bottom (D)
      red: 0xff0000,     // Right (R)
      orange: 0xff8000,  // Left (L)
      blue: 0x0000ff,    // Front (F)
      green: 0x00ff00,   // Back (B)
      black: 0x333333    // Hidden faces
    };

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // Skip the center piece (it's never visible)
          if (x === 0 && y === 0 && z === 0) continue;

          const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
          
          // Create materials for each face
          const materials = [
            new THREE.MeshLambertMaterial({ color: x === 1 ? colors.red : colors.black }), // Right
            new THREE.MeshLambertMaterial({ color: x === -1 ? colors.orange : colors.black }), // Left
            new THREE.MeshLambertMaterial({ color: y === 1 ? colors.white : colors.black }), // Top
            new THREE.MeshLambertMaterial({ color: y === -1 ? colors.yellow : colors.black }), // Bottom
            new THREE.MeshLambertMaterial({ color: z === 1 ? colors.blue : colors.black }), // Front
            new THREE.MeshLambertMaterial({ color: z === -1 ? colors.green : colors.black }) // Back
          ];

          const cube = new THREE.Mesh(geometry, materials);
          cube.position.set(x * totalSize, y * totalSize, z * totalSize);
          cube.castShadow = true;
          cube.receiveShadow = true;

          // Add black edges to make it look more like a real Rubik's cube
          const edges = new THREE.EdgesGeometry(geometry);
          const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
          const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
          cube.add(edgeLines);

          cubeGroup.add(cube);
        }
      }
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (groupRef.current && !showSolution) {
        groupRef.current.rotation.x += 0.005;
        groupRef.current.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // Mouse controls for rotation
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown || !groupRef.current) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      groupRef.current.rotation.y += deltaX * 0.01;
      groupRef.current.rotation.x += deltaY * 0.01;

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseUp);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.clear();
      renderer.dispose();
    };
  }, [showSolution]);

  // Handle cube state changes
  useEffect(() => {
    if (cubeState && groupRef.current) {
      // TODO: Update cube colors based on cubeState
      // This would involve mapping the cubeState to the individual cubelets
      console.log('Updating cube state:', cubeState);
    }
  }, [cubeState]);

  return (
    <div className="w-full">
      <div ref={containerRef} className="w-full h-[400px] rounded-lg border bg-gray-50" />
      <div className="text-center mt-2 text-sm text-gray-600">
        {showSolution ? 'Solution Preview' : 'Drag to rotate • Interactive 3D Rubik\'s Cube'}
      </div>
    </div>
  );
};

export default Cube3DViewer;
