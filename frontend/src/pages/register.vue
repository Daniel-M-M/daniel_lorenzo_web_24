<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      idcode: "",
      iddoctor: "",
      username: "",
      usersurname: "",
      emailadress: "",
      birthdate: "",
      reparto: "",
      password: "",
      confirmPassword: "",
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
          idcode: this.idcode,
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
        v-model="idcode"
        class="rounded-lg border-slate-200"
        placeholder="Codice Fiscale"
      />
      <input
          type="number"
          v-model="iddoctor"
          class="rounded-lg border-slate-200"
          placeholder="Codice Albo"
      />
      <input
          type="text"
          v-model="username"
          class="rounded-lg border-slate-200"
          placeholder="Nome"
      />
      <input
          type="text"
          v-model="usersurname"
          class="rounded-lg border-slate-200"
          placeholder="Cognome"
      />
      <input
          type="email"
          v-model="emailadress"
          class="rounded-lg border-slate-200"
          placeholder="e-mail"
      />
      <input
          type="date"
          v-model="birthdate"
          class="rounded-lg border-slate-200"
          placeholder="Data nascita"
      />
      <input
          type="text"
          v-model="reparto"
          class="rounded-lg border-slate-200"
          placeholder="Reparto"
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
