import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { randFloatSpread } from "three/src/math/MathUtils";
import "./index.css";

import GIFTCARD_TEXTURE from "../../Assets/Media/giftcard.webp";

const GiftCards = () => {
    let mouse = new THREE.Vector3();
    let plane, planeGeo, planeMat;

    const init = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 7;
        camera.position.x = 2;
        
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        document.getElementById("webgl-container").appendChild(renderer.domElement);
        
        window.addEventListener("resize", () => {
            let width = window.innerWidth;
            let height = window.innerHeight;
        
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        const giftcardTexture = new THREE.TextureLoader().load(GIFTCARD_TEXTURE);
        planeGeo = new THREE.PlaneGeometry(7, 5);
        planeMat = new THREE.MeshBasicMaterial({ map: giftcardTexture, side: THREE.DoubleSide});
        plane = new THREE.Mesh(planeGeo, planeMat);
        scene.add(plane);

        const onMouseMove = (e) => {
            let mouseX = e.clientX - window.innerWidth / 2;
            let mouseY = e.clientY - window.innerHeight / 2;

            camera.position.x = mouseX * 0.001;
            camera.position.y = -mouseY * 0.001;

            camera.lookAt(scene.position);
            camera.updateMatrixWorld();
        };

        document.addEventListener("mousemove", onMouseMove, false);

        const render = () => {
            renderer.render(scene, camera);
        };

        const update = () => {
            plane.rotation.y += 0.002;
        };

        const animate = () => {
            requestAnimationFrame(animate);
            render();
            update();
        };

        animate();
    };

    useEffect(() => {
        init();
    }, []);

    const openGiftcard = () => {window.open("https://monography.ca/gift-card/")}

    return (
        <>
            <section id="gift-cards-container" className="section">
                <div className="column-1">
                    <div className="description">
                        <h1> Share the photobooth experience with a friend </h1>
                        <h3> Purchase a gift card for yourself or for a friend! Capture memories together. </h3>
                    </div>
                </div>
                <div className="column-2">
                    <div id="webgl-container"></div>
                    <button id="purchase-giftcard-button" onClick={openGiftcard}> Purchase Giftcard</button>
                </div>
            </section>
        </>
    );
};

export default GiftCards;
