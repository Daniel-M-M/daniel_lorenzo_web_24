<script lang="ts">
import axios from "axios";
import {defineComponent, PropType} from "vue";
//import UserInfo from "./user-info.vue";
import {Doctors, Prestazione, User} from "../types";
import UserInfo from "./user-info.vue";

export default defineComponent({
  props: {
    user: Object as PropType<User>,
  },
  emits: ["submit"],
  data() {
    return {
      id_user: "",
      id_doctor: "",
      id_prestazione: "",
      data_prenotazione: "",
      ora_prenotazione: "",
      services: [] as Prestazione[],
      doctors: [] as Doctors[],
    }
  },
  computed: {
    canSubmit(): boolean {
      // Controllo se tutti i campi sono stati compilati correttamente
      const isDoctorSelected = this.id_doctor !== "";
      const isPrestazioneSelected = this.id_prestazione !== "";
      const isDataSelected = this.data_prenotazione !== "";
      const isOraSelected = this.ora_prenotazione !== "";

      // Restituzione di un valore booleano in base alla validità dei campi
      return isDoctorSelected && isPrestazioneSelected && isDataSelected && isOraSelected;
    },
  },
  methods: {
    async onSubmit() {
      if (!this.canSubmit) return

      await axios.post("/api/prenotation", {
        id_user: this.user?.id_user,                                   //UserInfo.user?.id_user,
        id_doctor: this.id_doctor,
        id_prestazione: this.id_prestazione,
        data_prenotazione: this.data_prenotazione,
        ora_prenotazione: this.ora_prenotazione,
      })
      this.id_doctor = "";
      this.id_prestazione= "";
      this.data_prenotazione= "";
      this.ora_prenotazione= "";
      this.$emit("submit")

    },
    async getPrestazione() {
      try {
        const response = await axios.get("/api/prestazioni/get");
        this.services = response.data;
      } catch (error) {
        console.error("Errore durante il recupero delle prestazioni:", error);
      }
    },
    async getDottore() {
      try {
        const response = await axios.get("/api/doctor/get");
        this.doctors = response.data.filter((doctor: { prestazione1: { toString: () => string; }; prestazione2: { toString: () => string; }; prestazione3: { toString: () => string; }; }) =>
            doctor.prestazione1 === this.id_prestazione ||
            doctor.prestazione2 === this.id_prestazione ||
            doctor.prestazione3 === this.id_prestazione)

      } catch (error) {
        console.error("Errore durante il recupero dei dottori:", error);
      }
    },
  },
  mounted() {
    this.getPrestazione()
    this.getDottore()
  },
})
</script>

<template>
  <div class="prose">
    <h1>Prenotazione</h1>
    <div> {{user?.id_user}}</div>
    <form @submit.prevent="onSubmit" class="not-prose flex flex-col gap-3">
      <div>
        <label class="block text-sm font-medium leading-6 text-gray-900">Erogazione</label>
        <select name="Erogazione"
                v-model="id_prestazione"
                @change="getDottore"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option v-for="service in services" :value="service.id" :key="service.id">
            {{ service?.titolo }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium leading-6 text-gray-900">Dottore</label>
        <select name="Dottore"
                v-model="id_doctor"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option v-for="doctor in doctors" :value="doctor.id_doctor" :key="doctor.id_doctor">
              Dott. {{ doctor?.doth_surname }} {{ doctor?.doth_name}}
          </option>
        </select>
      </div>
      <div>
        <input type="date" v-model="data_prenotazione" placeholder="Sceglie Giorno" class="rounded-lg border-slate-200"/>
        <input type="number" v-model="ora_prenotazione" min="8" max="18" value="8" step="1" placeholder="Sceglie ora" class="rounded-lg border-slate-200"/>
      </div>
      <button
          type="submit"
          class="btn !bg-blue-500 text-white disabled:!bg-slate-100 disabled:!text-slate-300 bottom-5 right-5"
          :disabled="!canSubmit"
      >
        Prenota
      </button>
    </form>
  </div>
</template>


<style scoped>

</style>