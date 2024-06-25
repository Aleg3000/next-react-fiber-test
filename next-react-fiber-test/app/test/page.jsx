'use client'

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color } from "three";
import styles from './page.module.css'

import vertexShader from "./vertexShader.glsl";
import fragmentShader from "./fragmentShader.glsl";
import React from "react";

const MovingPlane = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
    }), []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}  rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <div className={styles.wrapper}>
      <Canvas camera={{ position: [1.0, 1.5, 1.0] }}>
        <MovingPlane />
        <axesHelper />
        <OrbitControls />
      </Canvas>
    </div>
  );
};


export default Scene;
