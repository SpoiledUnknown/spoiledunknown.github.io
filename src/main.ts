import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { vReveal } from "./directives/vReveal";

const app = createApp(App);
app.directive("reveal", vReveal);
app.mount("#app");
