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
import '../node_modules/flowbite-vue/dist/index.css';
import vueAwesomeSidebar from 'vue-awesome-sidebar'
import 'vue-awesome-sidebar/dist/vue-awesome-sidebar.css'

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());
app.use(router);
app.use(ToastPlugin);
app.use(vueAwesomeSidebar)

Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule);
});

app.mount("#app");
