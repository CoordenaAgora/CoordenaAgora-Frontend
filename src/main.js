import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';


//in main.js
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeflex/themes/primeone-light.css'





const app = createApp(App)

app.use(router)
app.use(PrimeVue);

app.mount('#app')





