export default function FormSubmitButton() {
    const submitButton = document.getElementById("submit_button");
    const submissionPage = document.querySelector(".submission");
    const goBackButton = document.querySelector(".submission__btn");

   submitButton.addEventListener("click", e => {
       e.preventDefault();
       submissionPage.style.display = "flex";
       document.body.style.overflowY = "hidden";
   })

    goBackButton.addEventListener("click", e => {
        e.preventDefault();

        submissionPage.style.display = "none";
        document.body.style.overflowY = "auto";
    })
}
