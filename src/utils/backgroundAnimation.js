import "../vendor/three.min.js"
import "../vendor/vanta.waves.min.js";

const background = document.querySelector(".background");


export default function backgroundAnimation(){
    VANTA.WAVES({
        el: background,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x070a13,
        shininess: 20.00,
        waveHeight: 26.00,
        waveSpeed: 0.45,
        zoom: 0.25
    })
}