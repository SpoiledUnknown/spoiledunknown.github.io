const version = "0.2.0";

export default function FooterText() {
  document.querySelector(
    ".footer__title"
  ).innerHTML = `Copyright © ${new Date().getFullYear()} Shashank Raj — Spoiled Unknown. All rights reserved. || <a> V${version} </a>`;
}
