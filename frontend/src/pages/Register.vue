<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      id_user: "",
      user_name: "",
      user_surname: "",
      email_address: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
      errorStatus: 0,
      correctStatus: 0,
    }
  },
  computed: {
    canSubmit(): any {
      // Condizione per abilitare l'invio // aggiungere l'obbligo di avere almeno una prestazione
      return this.id_user && this.user_name && this.user_surname && this.email_address && this.password && this.confirmPassword != ""
    },
  },
  methods: {
    async onSubmit() {
      if (this.password != this.confirmPassword) {
        alert("Le due password non coincidono.")
        return
      }
      try {
        const resp = await axios.post("/api/auth/register", {
          id_user: this.id_user,
          user_name: this.user_name,
          user_surname: this.user_surname,
          password: this.password,
          email_address: this.email_address,
        })

        this.errorMessage = resp.data.message;
        if (resp.data.success){
          this.correctStatus = 1
        } else {
          this.errorStatus = 1
        }

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);

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

<script lang="ts" setup>
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/20/solid'
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
      <button type="submit"
              class="btn !bg-blue-500 disabled:!bg-slate-100 disabled:!text-slate-300 text-white w-1/2 mx-auto mt-3"
              :disabled="!canSubmit">
        Registrati
      </button>
      <div v-if="this.correctStatus === 1">
        <div class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else >
        <div v-if="this.errorStatus === 1">
          <div class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
