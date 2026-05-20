export function CheckCaptcha() {
    const form = document.querySelector(".contact__form");

    if (form === null) return;
    form.addEventListener("submit", function (e) {
        const hCaptcha = form.querySelector(
            "textarea[name='h-captcha-response']"
        ).value;

        console.log(hCaptcha);
        console.log(e);

        if (!hCaptcha) {
            e.preventDefault();
            alert("Please fill out captcha field");
        }
    });
}

export function FormSubmitButton() {
    const submitButton = document.getElementById("submit_button");
    const submissionPage = document.querySelector(".submission");
    const goBackButton = document.querySelector(".submission__btn");
    const form = document.querySelector("form"); // or use an id/class if you have one

    submitButton.addEventListener("click", e => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        submissionPage.style.opacity = "0";
        submissionPage.style.display = "flex";
        document.body.style.overflowY = "hidden";
        void submissionPage.offsetWidth;
        submissionPage.style.opacity = "1";
    });

    goBackButton.addEventListener("click", e => {
        e.preventDefault();
        submissionPage.style.opacity = "0";
    });

    submissionPage.addEventListener("transitionend", () => {
        if (submissionPage.style.opacity === "0") {
            submissionPage.style.display = "none";
            document.body.style.overflowY = "auto";
        }
    });
}
