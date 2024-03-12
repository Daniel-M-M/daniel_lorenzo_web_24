<template>
  <div v-if="this.correctStatus === 1">
    <div class="rounded-md bg-green-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800">{{ message }}</p>
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
            <p class="text-sm font-medium text-red-800">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
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
        errorStatus: 0,
        correctStatus: 0,
        message: "",
      }
    },
    methods: {
      async onSubmit() {
        try {
          const resp = await axios.post("/api/auth/login", {
            id_user: this.id_user,
            password: this.password,
          })

          this.message = resp.data.message;
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

<script lang="ts" setup>
  import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/20/solid'
</script>
