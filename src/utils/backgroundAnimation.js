import WAVES from "vanta/dist/vanta.waves.min";

export default function backgroundAnimation() {
    const background = document.querySelector(".background");

    WAVES.default({
        el: background,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x070a13,
        shininess: 26.00,
        waveHeight: 36.00,
        waveSpeed: 0.35
    })
}
