import axios from "axios"
import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import App from "./App.vue"
//import AdminView from "./pages/admin-view.vue";
import Home from "./pages/Home.vue"
import Login from "./pages/Login.vue"
import NotFound from "./pages/Not-found.vue"
import Register from "./pages/Register.vue"
import { User } from "./types"

import "./style.css"

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/login",
      component: Login,
      meta: { requireLogout: true },
    },
    { path: "/register",
      component: Register,
      meta: { requireLogout: true },
    },
    // Ipotetica rotta che richiede il login
    /*{
      path: "/admin",
      component: AdminView,
      meta: { requireLogin: true},
    },*/
    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
})

router.beforeEach(async (to) => {
  const res = await axios.get("/api/auth/profile")
  const user = res.data as User | null

  if (to.meta.requireLogin && !user) {
    return { path: "/login" }
  }

  if (to.meta.requireLogout && user) {
    return { path: "/" }
  }

  if (to.meta.requiredLogin && user?.role === "admin") {
    return { path:"/admin" }
  }
})

createApp(App).use(router).mount("#app")
