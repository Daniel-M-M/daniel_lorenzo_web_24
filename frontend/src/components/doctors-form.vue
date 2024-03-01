<script lang="ts">
  import axios from "axios";
  import {defineComponent} from "vue";
  import {Prestazione} from "../types";


  export default defineComponent({
    emits: ["submit"],
    data() {
      return {
        id_doctor: "",
        doth_name: "",
        doth_surname: "",
        password: "",
        confirmPassword: "",
        prestazione1: "",
        prestazione2: "",
        prestazione3: "",
        services: [] as Prestazione[],
        errorMessageDoc: "",
        errorStatusDoc: "",
      }
    },
    computed: {
      canSubmit(): any {
        // Condizione per abilitare l'invio
        return this.id_doctor && this.doth_name && this.doth_surname && this.prestazione1 && this.password && this.confirmPassword != ""
      },
    },
    methods: {
      // TODO
      async onSubmit() {
        if (!this.canSubmit) return

        if (this.password != this.confirmPassword) {
          alert("Le due password non coincidono.")
          return
        }

        try {
          const response1 = await axios.post("/api/doctor/", {
            id_doctor: this.id_doctor,
            doth_name: this.doth_name,
            doth_surname: this.doth_surname,
            password: this.password,
            prestazione1: this.prestazione1,
            prestazione2: this.prestazione2,
            prestazione3: this.prestazione3,
          })
          this.id_doctor = ""
          this.doth_name = ""
          this.doth_surname = ""
          this.password = ""
          this.confirmPassword = ""
          this.prestazione1 = ""
          this.prestazione2 = ""
          this.prestazione3 = ""
          this.$emit("submit")

          this.errorMessageDoc = response1.data.message;
          this.errorStatusDoc = response1.data.success;

          setTimeout(() => {
            window.location.href = "/";
          }, 2000);

        } catch (e) {
          console.error("Error durante la creazione nel db dottore", e)
        }
      },

      async getPrestazione() { // Per renderizzare nel template
        try {
          const response = await axios.get("/api/prestazioni/get");
          this.services = response.data; //salvo tutte le prestazione qui
        } catch (error) {
          console.error("Errore durante il recupero delle prestazioni:", error);
        }
      },
    },
    mounted() {
      this.getPrestazione()
    },
  })
</script>

<script lang="ts" setup>
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <form @submit.prevent="onSubmit" class="not-prose flex relative mb-5 mt-3">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label for="Albo_codice" class="block text-sm font-medium leading-6 text-gray-900">Codice Albo</label>
        <input id="Albo_codice"
               type="text"
               name="Albo_codice"
               v-model="id_doctor"
               class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
      <div>
        <!-- TODO aggiungere @change per far sparire la prima scelta della prestazione -->
        <label for="prestazione1" class="block text-sm font-medium leading-6 text-gray-900">Prestazione Principale</label>
        <select id="prestazione1"
                name="prestazione1"
                v-model="prestazione1"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option v-for="service in services" :value="service.id" :key="service.id">
            {{ service?.titolo }}
          </option>
        </select>
      </div>
      <div>
        <label for="Nome_dottore" class="block text-sm font-medium leading-6 text-gray-900">Nome</label>
        <input id="Nome_dottore"
               type="text"
               name="Nome_dottore"
               v-model="doth_name"
               class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
      <div>
        <label for="prestazione2" class="block text-sm font-medium leading-6 text-gray-900">Prestazione opzionale</label>
        <select id="prestazione2"
                name="prestazione2"
                v-model="prestazione2"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option v-for="service in services" :value="service.id" :key="service.id">
            {{ service?.titolo }}
          </option>
        </select>
      </div>
      <div>
        <label for="doth_surname" class="block text-sm font-medium leading-6 text-gray-900">Cognome</label>
        <input id="doth_surname"
               type="text"
               name="doth_surname"
               v-model="doth_surname"
               autocomplete="family-name"
               class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
      <div>
        <label for="prestazione3" class="block text-sm font-medium leading-6 text-gray-900">Prestazione opzionale</label>
        <select id="prestazione3"
                name="prestazione3"
                v-model="prestazione3"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option v-for="service in services" :value="service.id" :key="service.id">
            {{ service?.titolo }}
          </option>
        </select>
      </div>
      <div>
        <label for="newPassword" class="block text-sm font-medium leading-6 text-gray-900">New Password</label>
        <input
            name="newPassword"
            id="newPassword"
            type="password"
            v-model="password"
            class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            autocomplete="new-password"
        />
      </div>
      <div>
        <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
        <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            v-model="confirmPassword"
            class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            autocomplete="new-password"
        />
      </div>
      <div v-if="errorStatusDoc">
        <div class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">{{ errorMessageDoc }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else >
        <div v-if="!errorStatusDoc && errorStatusDoc !== ''">
          <div class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">{{ errorMessageDoc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
          type="submit"
          class="mt-8 block btn !bg-blue-500 text-white disabled:!bg-slate-100 disabled:!text-slate-300 bottom-0 right-5"
          :disabled="!canSubmit">
        Inserisce
      </button>
    </div>
  </form>
</template>


<style scoped>

</style>