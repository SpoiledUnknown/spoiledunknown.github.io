import {version} from "../../config.json";

export default function FooterText() {
  document.querySelector(
    ".footer__title"
  ).innerHTML = `Copyright © 2019 - ${new Date().getFullYear()} Shashank Raj — Spoiled Unknown. All rights reserved. || <a> V${version} </a>`;
}
