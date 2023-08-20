"use client";

import * as THREE from "three";

import React, { ComponentProps, use, useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, extend } from "@react-three/fiber";
import {
  Text3D,
  Center,
  OrbitControls,
  useGLTF,
  Clone,
  Environment,
} from "@react-three/drei";

const models = {
  cauldron:
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cauldron/model.gltf",
  witch:
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/witch/model.gltf",
  brokenWall:
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/broken-wall/model.gltf",
  wall: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/wall/model.gltf",
  duck: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf",
  dog: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/dog/model.gltf",
  bear: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bear/model.gltf",
  zombie:
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/zombie-1/model.gltf",
};

useGLTF.preload(models.wall);
useGLTF.preload(models.brokenWall);
useGLTF.preload(models.bear);
useGLTF.preload(models.dog);
useGLTF.preload(models.duck);
useGLTF.preload(models.cauldron);
useGLTF.preload(models.witch);
useGLTF.preload(models.zombie);

const Text = (props: ThreeElements["mesh"]) => {
  return (
    <Center top position={[0, 10, -12]}>
      <Text3D font={"/chocolate_bar_regular.json"} {...props} scale={3}>
        Soon to rise portfolio
        <meshNormalMaterial />
      </Text3D>
    </Center>
  );
};

type ModelProps = Omit<ComponentProps<typeof Clone>, "object"> & {
  url: string;
  object?: THREE.Object3D<THREE.Event> | THREE.Object3D<THREE.Event>[];
};

const Model = (props: ModelProps) => {
  const { object, url, ...cProps } = props;
  const { scene } = useGLTF(url);
  return <Clone object={scene} {...cProps} />;
};

type SpecificModelProps = Omit<ModelProps, "url">;
const DuckModel = (props: SpecificModelProps) => {
  return <Model url={models.duck} {...props} />;
};
const DogModel = (props: SpecificModelProps) => {
  return <Model url={models.dog} {...props} />;
};
const BearModel = (props: SpecificModelProps) => {
  return <Model url={models.bear} {...props} />;
};
const ZombieModel = (props: SpecificModelProps) => {
  return <Model url={models.zombie} {...props} />;
};
const WitchModel = (props: SpecificModelProps) => {
  return <Model url={models.witch} {...props} />;
};
const CauldronModel = (props: SpecificModelProps) => {
  return <Model url={models.cauldron} {...props} />;
};
const BrokenWallModel = (props: SpecificModelProps) => {
  return <Model url={models.brokenWall} {...props} />;
};
const WallModel = (props: SpecificModelProps) => {
  return <Model url={models.wall} {...props} />;
};

const WallGroup = () => {
  return (
    <group>
      {/* Z wall */}
      <WallModel position={[-16, 0, 1.31]} rotation={[0, 30, 0]} />
      <WallModel position={[-15.4, 0, 5.27]} rotation={[0, 30, 0]} />
      {/* End of Z wall */}

      {/* X wall */}
      <WallModel position={[-14, 0, 0]} />
      <WallModel position={[-10, 0, 0]} />
      <WallModel position={[-6, 0, 0]} />
      <WallModel position={[-2, 0, 0]} />
      <WallModel position={[2, 0, 0]} />
      <BrokenWallModel position={[6, 0, 0]} />
      <WallModel position={[10, 0, 0]} />
      <WallModel position={[14, 0, 0]} />
      {/* End of X wall */}

      {/* Z wall */}
      <WallModel position={[16, 0, 1.31]} rotation={[0, 30, 0]} />
      <WallModel position={[16.6, 0, 5.27]} rotation={[0, 30, 0]} />
      {/* End of Z wall */}
    </group>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between h-[100vh]">
      <div>
        <p>Use your mouse buttons/scroll to move the scene!</p>
      </div>
      <Canvas camera={{ position: [-1, 6, 16], near: 0.025 }}>
        <Environment
          blur={0}
          files={[
            "/environment/px.png",
            "/environment/nx.png",
            "/environment/py.png",
            "/environment/ny.png",
            "/environment/pz.png",
            "/environment/nz.png",
          ]}
          preset={undefined}
        />
        <Text />
        <WallGroup />
        <WitchModel position={[0, 0, 3]} scale={2} />
        <CauldronModel position={[0, 0, 5.3]} scale={1.5} />
        <DuckModel position={[-3, 0, 7]} rotation={[0, 2, 0]} />
        <DogModel position={[-3, 0, 10]} rotation={[0, 2, 0]} />
        <BearModel position={[3, 0, 7]} rotation={[0, -2, 0]} />
        <ZombieModel position={[6, 0, -0.5]} rotation={[0, -0.5, 0]} />
        <OrbitControls />
      </Canvas>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        Contact me on:{" "}
        <a className="ml-3" href={`mailTo:gpeteamd@gmail.com`}>
          gpeteamd@gmail.com
        </a>
      </footer>
    </main>
  );
}
