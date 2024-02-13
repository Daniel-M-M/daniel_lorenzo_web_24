<script lang="ts">
import axios from "axios";
import {defineComponent} from "vue";
import UserInfo from "./user-info.vue";


export default defineComponent({
  emits: ["submit"],
  data() {
    return {
      id_doctor: "",
      id_prestazione: "",
      data_prenotazione: "",
      ora_prenotazione: "",
    }
  },
  computed: {
    canSubmit(): any {
      // Condizione per abilitare l'invio
      return this.id_doctor && this.id_prestazione && this.data_prenotazione && this.ora_prenotazione != ""
    },
  },
  methods: {
    async onSubmit() {
      if (!this.canSubmit) return
      await axios.post("/api/prenotation", {
        id_user: UserInfo.user?.id_user,
        id_doctor: this.id_doctor,
        id_prestazione: this.id_prestazione,
        data_prenotazione: this.data_prenotazione,
        ora_prenotazione: this.ora_prenotazione,
      })
      this.id_doctor = ""
      this.id_prestazione = ""
      this.data_prenotazione = ""
      this.ora_prenotazione = ""
      this.$emit("submit")
    },
  },
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="not-prose flex relative mb-10">
    <div>
      <label for="Erogazione" class="block text-sm font-medium leading-6 text-gray-900">Erogazione</label>
      <select id="Erogazione"
              name="Erogazione"
              v-model="id_prestazione"
              class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <!-- option @select="prestazione.id">{{ prestazione.titolo }}</option -->
      </select>
    </div>
    <div>
      <label for="Dottore" class="block text-sm font-medium leading-6 text-gray-900">Dottore</label>
      <select id="Dottore"
              name="Dottore"
              v-model="id_doctor"
              class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <!-- option @select="dottore.id">{{ dottore.titolo }}</option -->
      </select>
    </div>
    <div>
      <input type="date" v-model="data_prenotazione" placeholder="Sceglie Giorno"/>
      <input type="number" v-model="ora_prenotazione" min="8" max="18" value="8" step="1" placeholder="Sceglie ora"/>
    </div>
    <button
        type="submit"
        class="btn !bg-blue-500 text-white disabled:!bg-slate-100 disabled:!text-slate-300 absolute bottom-5 right-5"
        :disabled="!canSubmit"
    >
      Prenota
    </button>
  </form>

</template>


<style scoped>

</style>