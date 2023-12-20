import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Upload from '../views/Upload.vue'

// 1. Define route components.
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', name: "Home", component: Home },
  { path: '/search', name: "Search", component: Search },
  { path: '/upload', name: "Upload", component: Upload },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes // short for `routes: routes`
})

export default router;