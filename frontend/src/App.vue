<script lang="ts">

  import axios from "axios"
  import { defineComponent } from "vue"
  import UserInfo from "./components/user-info.vue"
  import PrestazionePrezzo from "./components/prestazione_item.vue"
  import AdminView from "./components/admin.vue"
  import { User } from "./types"
  import BookForm from "./components/book-form.vue";
  import BookItem from "./components/book-item.vue";

  export default defineComponent({
    components: {AdminView, BookItem, BookForm, UserInfo, PrestazionePrezzo },
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
    <div v-if="user && user.role !== 'admin'" class="">
      <book-form :user="user"></book-form>
      <book-item :user="user"></book-item>
    </div>
    <div v-else-if="user && user.role === 'admin'" class="">
      <AdminView :user="user"></AdminView>
      <!-- TODO parte della vista del superuser -->
    </div>
    <template v-else>
      <RouterView/>
    </template>
  </main>
  <footer class="flex p-6">
  </footer>
</template>
