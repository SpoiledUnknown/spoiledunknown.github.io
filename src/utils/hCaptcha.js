const form = document.querySelector(".contact__form");

export default function CheckCaptcha() {
    if (form === null) return;
    form.addEventListener("submit", function (e) {
        const hCaptcha = form.querySelector(
            "textarea[name = 'h-captcha-response']"
        ).value;

        if (!hCaptcha) {
            e.preventDefault();
            alert("Please fill out captcha field");
            return;
        }
    });
}
