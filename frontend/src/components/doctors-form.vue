<script lang="ts">
import axios from "axios";
import {defineComponent} from "vue";


export default defineComponent({
  emits: ["submit"],
  data() {
    return {
      id_doctor: "",
      doth_name: "",
      doth_surname: "",
      prestazione1: "",
      prestazione2: "",
      prestazione3: "",
    }
  },
  computed: {
    canSubmit(): any {
      // Condizione per abilitare l'invio
      return this.id_doctor && this.doth_name && this.doth_surname && this.prestazione1 != ""
    },
  },
  methods: {
    // TODO creare una funzione get di prestazione per il menu a tendina che apparirà per il form doctor
    async onSubmit() {
      if (!this.canSubmit) return
      await axios.post("/api/prenotation", {
        id_doctor: this.id_doctor,
        doth_name: this.doth_name,
        doth_surname: this.doth_surname,
        prestazione1: this.prestazione1,
        prestazione2: this.prestazione2,
        prestazione3: this.prestazione3,
      })
      this.id_doctor = ""
      this.doth_name = ""
      this.doth_surname = ""
      this.prestazione1 = ""
      this.prestazione2 = ""
      this.prestazione3 = ""
      this.$emit("submit")
    },
  },
})
</script>

<template>
  <!-- TODO cambiare i gap per ogni info del form doctor appare solo numeri a menu tendina -->
  <!-- TODO per le prestazioni un menu a tendina con le prestazioni disponibile nel db con un get prestazione all'interno di questo file -->
  <form @submit.prevent="onSubmit" class="not-prose flex relative mb-5 mt-3">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label for="Albo_codice" class="block text-sm font-medium leading-6 text-gray-900">Codice Albo</label>
        <input id="Albo_codice"
               type="number"
               name="Albo_codice"
               v-model="id_doctor"
               class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
      <div>
        <label for="prestazione1" class="block text-sm font-medium leading-6 text-gray-900">Prestazione Principale</label>
        <input id="prestazione1"
               type="number"
               name="prestazione1"
               v-model="prestazione1"
               class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
      <div>
        <label for="Nome_dottore" class="block text-sm font-medium leading-6 text-gray-900">Nome</label>
        <input id="Nome_dottore"
               type="number"
                name="Nome_dottore"
                v-model="doth_name"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
      <div>
        <label for="prestazione2" class="block text-sm font-medium leading-6 text-gray-900">Prestazione opzionale</label>
        <input id="prestazione2"
               type="number"
               name="prestazione2"
               v-model="prestazione2"
               class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
      <div>
        <label for="doth_surname" class="block text-sm font-medium leading-6 text-gray-900">Cognome</label>
        <input id="doth_surname"
               type="number"
                name="doth_surname"
                v-model="doth_surname"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
      <div>
        <label for="prestazione3" class="block text-sm font-medium leading-6 text-gray-900">Prestazione opzionale</label>
        <input id="prestazione3"
               type="number"
                name="prestazione3"
                v-model="prestazione3"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
      <button
          type="submit"
          class="btn !bg-blue-500 text-white disabled:!bg-slate-100 disabled:!text-slate-300 bottom-5 right-5"
          :disabled="!canSubmit"
      >
        Inserisce
      </button>
    </div>
  </form>
</template>


<style scoped>

</style>