"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function NFTCardMesh({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();

        // Slow Y rotation
        meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.3;
        // Subtle X tilt
        meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
        // Mouse parallax
        meshRef.current.rotation.y += (mouse.current[0] * 0.3 - meshRef.current.rotation.y) * 0.05;
        meshRef.current.rotation.x += (-mouse.current[1] * 0.15 - meshRef.current.rotation.x) * 0.05;

        if (glowRef.current) {
            glowRef.current.rotation.y = meshRef.current.rotation.y * 0.5;
            glowRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.05);
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5}>
            {/* Glow sphere behind card */}
            <mesh ref={glowRef} position={[0, 0, -0.5]}>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial
                    color="#7C3AED"
                    transparent
                    opacity={0.08}
                    roughness={1}
                />
            </mesh>

            {/* Main card */}
            <RoundedBox
                ref={meshRef}
                args={[2.2, 3, 0.12]}
                radius={0.1}
                smoothness={4}
                position={[0, 0, 0]}
            >
                <meshPhysicalMaterial
                    color="#1a1030"
                    metalness={0.9}
                    roughness={0.1}
                    transmission={0.1}
                    thickness={0.5}
                    reflectivity={1}
                    envMapIntensity={2}
                    clearcoat={1}
                    clearcoatRoughness={0.05}
                />
            </RoundedBox>

            {/* Purple gradient plane on card face */}
            <mesh position={[0, 0.4, 0.065]}>
                <planeGeometry args={[1.9, 1.7]} />
                <meshStandardMaterial
                    color="#4f1b8c"
                    metalness={0.3}
                    roughness={0.6}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Card bottom info strip */}
            <mesh position={[0, -0.85, 0.065]}>
                <planeGeometry args={[1.9, 0.7]} />
                <meshStandardMaterial
                    color="#1a0f2a"
                    metalness={0.1}
                    roughness={0.8}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Glow rim lines */}
            <lineSegments position={[0, 0, 0.07]}>
                <edgesGeometry args={[new THREE.PlaneGeometry(2.18, 2.98)]} />
                <lineBasicMaterial color="#9333ea" transparent opacity={0.4} />
            </lineSegments>
        </Float>
    );
}

export default function HeroCanvas() {
    const mouse = useRef<[number, number]>([0, 0]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        mouse.current = [
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1,
        ];
    };

    return (
        <div
            className="w-full h-full"
            onMouseMove={handleMouseMove}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: "transparent" }}
            >
                {/* Lights */}
                <ambientLight intensity={0.4} />
                <pointLight position={[-3, 3, 3]} intensity={3} color="#A855F7" />
                <pointLight position={[3, -2, 2]} intensity={2} color="#3B82F6" />
                <pointLight position={[0, 0, 4]} intensity={1} color="#ffffff" />
                <directionalLight position={[5, 5, 5]} intensity={0.5} />

                <NFTCardMesh mouse={mouse} />
            </Canvas>
        </div>
    );
}
