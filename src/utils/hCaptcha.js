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

export function setupContactForm() {
    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit_button");
    const status = document.getElementById("form-status");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        status.textContent = "";

        try {
            const formData = new FormData(form);

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (result.success) {
                status.textContent =
                    "✓ Message sent successfully.";

                form.reset();

                if (
                    window.hcaptcha &&
                    typeof hcaptcha.reset === "function"
                ) {
                    hcaptcha.reset();
                }
            } else {
                status.textContent =
                    result.message ||
                    "Failed to send message.";

                console.error(result);
            }
        } catch (error) {
            console.error(error);

            status.textContent =
                "Network error. Please try again.";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Submit";
        }
    });
}
