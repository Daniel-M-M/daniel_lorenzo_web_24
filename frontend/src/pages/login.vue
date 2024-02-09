<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      idcode: "",
      password: "",
    }
  },
  methods: {
    async onSubmit() {
      try {
        await axios.post("/api/auth/login", {
          username: this.idcode,
          password: this.password,
        })
        window.location.href = "/"
      } catch (e: any) {
        if (e.response) {
          alert(`${e.response.status} - ${e.response.statusText}\n${e.response.data}`)
        } else {
          alert(e.message)
        }
      }
    },
  },
})
</script>

<template>
  <div class="prose">
    <h1>Login</h1>
    <form class="not-prose flex flex-col gap-3" @submit.prevent="onSubmit">
      <input
        type="text"
        v-model="idcode"
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
