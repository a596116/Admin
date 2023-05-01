import type { App } from 'vue'
import { setupPinia } from '../plugins/pinia'
import { setupSvgIcon } from './svgIcon'
import './tailwindcss/tailwindcss.css'


export const setupPlugins = (app: App) => {
    setupPinia(app)
    setupSvgIcon(app)
}

