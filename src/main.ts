import { createApp } from 'vue'
import { setupPlugins } from './plugins'
import App from './App.vue'
import router, { setupRouter } from './router'


const app = createApp(App)
setupPlugins(app)
setupRouter(app)
app.use(router)

app.mount('#app')
