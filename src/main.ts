import "vazirmatn/Vazirmatn-font-face.css";
import "./assets/main.css";
import "vue3-perfect-scrollbar/style.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { defineRule } from "vee-validate";
import { all } from "@vee-validate/rules";

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());
app.use(router);
app.use(ToastPlugin);

Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule);
});

app.mount("#app");
