<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"
import UserInfo from "./components/user-info.vue"
import { User } from "./types"

export default defineComponent({
  components: { UserInfo },
  data() {
    return {
      user: null as User | null,
    }
  },
  methods: {
    async getUser() {
      const res = await axios.get("/api/auth/profile")
      this.user = res.data
    },
  },
  mounted() {
    this.getUser()
  },
})
</script>

<template>
  <header class="flex items-center p-6">
    <RouterLink to="/" class="text-blue-500 font-bold">Home</RouterLink>
    <div class="grow flex justify-end items-center gap-3">
      <UserInfo v-if="user" :user="user" />
      <template v-else>
        <RouterLink to="/login" class="btn">Login</RouterLink>
        <RouterLink to="/register" class="btn !bg-blue-500 text-white">Registrati</RouterLink>
      </template>
    </div>
  </header>
  <main class="grow py-6 border-y border-slate-200 mx-6">
    <!-- Passa l'utente come prop a tutte le pagine del router -->
    <RouterView :user="user" />
  </main>
  <footer class="flex p-6">

  </footer>
</template>
