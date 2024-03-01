<script lang="ts">
  import axios from "axios";
  import {defineComponent} from "vue";

  export default defineComponent({
    emits: ["submit"],
    data() {
      return {
        titolo: "",
        costo: "",
        errorMessage: "",
        errorStatus: "",
      }
    },
    computed: {
      canSubmit(): any {
        // Condizione per abilitare l'invio
        return this.titolo && this.costo != ""
      },
    },
    methods: {
      async onSubmit() {
        if (!this.canSubmit) return
        try {
          const response = await axios.post("/api/prestazione/", {
            titolo: this.titolo,
            costo: this.costo,
          })
          this.titolo = ""
          this.costo = ""
          this.$emit("submit")

          this.errorMessage = response.data.message;
          this.errorStatus = response.data.success;

          setTimeout(() => {
            window.location.href = "/";
          }, 2000);

        } catch (e) {
          console.error("Fail nella inserzione di una prenotazione")
        }
      },
    },
  })
</script>

<script lang="ts" setup>
  import { CheckCircleIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div v-if="errorStatus">
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
  <form @submit.prevent="onSubmit" class="not-prose flex flex-row gap-2">
    <div>
      <label for="titolo_servizio" class="block text-sm font-medium leading-6 text-gray-900">Titolo Servizio</label>
      <input id="titolo_servizio"
             type="text"
             name="titolo_servizio"
             v-model="titolo"
             class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
    </div>
    <div>
      <label for="costo_servizio" class="block text-sm font-medium leading-6 text-gray-900">Costo</label>
      <input id="costo_servizio"
             type="text"
             name="costo_servizio"
             v-model="costo"
             class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
    </div>
    <button
        type="submit"
        class="mt-8 block btn !bg-blue-500 text-white disabled:!bg-slate-100 disabled:!text-slate-300 bottom-5 right-5"
        :disabled="!canSubmit"
    >
      Aggiunge
    </button>
  </form>
</template>

<style scoped>

</style>