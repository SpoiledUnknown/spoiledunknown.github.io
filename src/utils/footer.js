const version = "0.1.2";

export default function FooterText() {
  document.querySelector(
    ".footer__title"
  ).innerHTML = `Copyright © ${new Date().getFullYear()} Spoiled Unknown. All rights reserved. || <a> V${version} </a>`;
}
