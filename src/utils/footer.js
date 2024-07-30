const version = "0.1.1";

export default function FooterText() {
  document.querySelector(
    ".footer__title"
  ).innerHTML = `Copyright © ${new Date().getFullYear()} Spoiled Unknown. All rights reserved. <br /> This website is made using <strong>HTML, JS and CSS</strong> || <a> ${version} </a>`;
}
