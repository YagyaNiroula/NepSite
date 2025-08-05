import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'
import PostsPage from '../views/Posts.vue'
import AboutPage from '../views/About.vue'
import PostDetailPage from '../views/PostDetail.vue'


const routes = [
  // Main route: Home page - Landing page with featured posts
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  
  // Main route: Posts page - Blog posts listing with create functionality
  {
    path: '/posts',
    name: 'Posts',
    component: PostsPage,
    meta: { title: 'Blog Posts' }
  },
  
  // NESTED ROUTE: Post Detail page - Individual blog post view
  // This is the nested route that extends the /posts route
  // Route parameter :id allows dynamic routing to specific posts
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetailPage,
    meta: { title: 'Post Detail' }
  },
  
  // Main route: About page - Information about the blog
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    meta: { title: 'About Us' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 