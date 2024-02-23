<template>
  <div class="prose">
    <h1>Login</h1>
    <form class="not-prose flex flex-col gap-3" @submit.prevent="onSubmit">
      <input
          type="text"
          v-model="id_user"
          class="rounded-lg border-slate-200"
          placeholder="Codice Fiscale"
      />
      <input
          type="password"
          v-model="password"
          class="rounded-lg border-slate-200"
          placeholder="Password"
      />
      <button type="submit" class="btn !bg-blue-500 text-white w-1/2 mx-auto mt-3">Accedi</button>
    </form>
  </div>
</template>

<script lang="ts">
  import axios from "axios"
  import { defineComponent } from "vue"

  export default defineComponent({
    data() {
      return {
        id_user: "",
        password: "",
      }
    },
    methods: {
      async onSubmit() {
        try {
          await axios.post("/api/auth/login", {
            id_user: this.id_user,
            password: this.password,
          })
          window.location.href = "/"
        } catch (e: any) {
          if (e.response) {
            alert(`${e.response.status} - ${e.response.statusText}\n${e.response.data}`)
            console.error("Erro nel if di response di login.vue")
          } else {
            alert(e.message)
            console.error("Erro nel if di response di login.vue")
          }
        }
      },
    },
  })
</script>
