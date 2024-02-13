<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      id_user: "" as FormDataEntryValue,
      user_name: "" as FormDataEntryValue,
      user_surname: "" as FormDataEntryValue,
      email_address: "" as FormDataEntryValue,
      password: "" as FormDataEntryValue,
      confirmPassword: "" as FormDataEntryValue,
    }
  },
  methods: {
    async onSubmit() {
      if (this.password != this.confirmPassword) {
        alert("Le due password non coincidono.")
        return
      }
      try {
        await axios.post("/api/auth/register", {
          id_user: this.id_user,
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
    <h1>Registrazione</h1>
    <form class="not-prose flex flex-col gap-3" @submit.prevent="onSubmit">
      <input
        type="text"
        v-model="id_user"
        class="rounded-lg border-slate-200"
        placeholder="Codice Fiscale"
      />
      <input
          type="text"
          v-model="user_name"
          class="rounded-lg border-slate-200"
          placeholder="Nome"
      />
      <input
          type="text"
          v-model="user_surname"
          class="rounded-lg border-slate-200"
          placeholder="Cognome"
      />
      <input
          type="email"
          v-model="email_address"
          class="rounded-lg border-slate-200"
          placeholder="e-mail"
      />
      <input
        type="password"
        v-model="password"
        class="rounded-lg border-slate-200"
        placeholder="Password"
      />
      <input
        type="password"
        v-model="confirmPassword"
        class="rounded-lg border-slate-200"
        placeholder="Conferma password"
      />
      <button type="submit" class="btn !bg-blue-500 text-white w-1/2 mx-auto mt-3">
        Registrati
      </button>
    </form>
  </div>
</template>
