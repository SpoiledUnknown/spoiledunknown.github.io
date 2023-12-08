function FooterText()
{
    document.querySelector('.footer__title').innerHTML = "Copyright © " + (new Date().getFullYear()) + " Spoiled Unknown.<br />All rights reserved."
}

export default FooterText