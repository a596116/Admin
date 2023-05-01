import { createApp } from 'vue'
import { setupPlugins } from './plugins'
import App from './App.vue'
import router from './router'


const app = createApp(App)
setupPlugins(app)
app.use(router)

app.mount('#app')
