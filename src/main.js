import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import CSS files
import './assets/css/app.css'
import './assets/css/navigation.css'
import './assets/css/home.css'
import './assets/css/posts.css'
import './assets/css/about.css'
import './assets/css/post-detail.css'
import './assets/css/forms.css'

/**
 * VUE ROUTER INTEGRATION
 * 
 * Vue Router is integrated into the Vue application here
 * This enables client-side routing throughout the application
 * 
 * Router provides:
 * - Main routes: /, /posts, /about
 * - Nested routes: /posts/:id
 * - Navigation with router-link components
 */
createApp(App).use(router).mount('#app')
