<script lang="ts">
  import axios from "axios";
  import {defineComponent, PropType} from "vue";
  import {Booking, Doctors, Prestazione, User} from "../types";

  export default defineComponent({
    props: {
      user: Object as PropType<User>,
    },
    emits: ["submit"],
    data() {
      return {
        book: {} as Booking,
        services: [] as Prestazione[],
        doctors: [] as Doctors[],
        errorMessage: "",
        errorStatus: "",
      }
    },
    computed: {
      canSubmit(): any {
        return this.book.id_doctor && this.book.id_prestazione && this.book.data_prenotazione && this.book.ora_prenotazione
      },
    },
    methods: {
      async onSubmit() {
        if (!this.canSubmit) return

        // Verifica se user è definito e se id_user è una stringa valida
        if (this.$props.user && this.$props.user.id_user !== "") {
          this.book.id_user = this.$props.user.id_user
        } else {
          console.error("Errore id_user:", this.$props.user);
          return; // Interrompi l'esecuzione se id_user non è valido
        }

        try {
          const response = await axios.post("/api/prenotation", {
            id_user: this.book.id_user,
            id_doctor: this.book.id_doctor,
            id_prestazione: this.book.id_prestazione,
            data_prenotazione: this.book.data_prenotazione,
            ora_prenotazione: this.book.ora_prenotazione,
          });

          this.$emit("submit");

          this.errorMessage = response.data.message;
          this.errorStatus = response.data.success;

        } catch (e: any) {
          if (e.response) { // Per le bad response TODO trattare qui i log di errori?
            console.error("Errore completo:", e);
            console.error("Errore nel response il contenuto inviato è:", this.book);
          } else {
            console.error("Errore caso else recupero del' id_user:", this.book);
          }
        }
      },

      async getPrestazione() { // Per renderizzare nel template
        try {
          const response = await axios.get("/api/prestazioni/get");
          this.services = response.data; //salvo tutte le prenotazione qui
        } catch (error) {
          console.error("Errore durante il recupero delle prestazioni:", error);
        }
      },
      async getDottore() {  // Per renderizzare nel template
        try {
          const response = await axios.get("/api/doctor/get");
          // Renderizzo da una lista di dottori tutti quelli che hanno quella prenotazione
          this.doctors = response.data.filter((doctor: { prestazione1: { toString: () => string; }; prestazione2: { toString: () => string; }; prestazione3: { toString: () => string; }; }) =>
              doctor.prestazione1 === this.book.id_prestazione ||
              doctor.prestazione2 === this.book.id_prestazione ||
              doctor.prestazione3 === this.book.id_prestazione)

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

<script setup lang="ts">
  import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div class="prose">
    <h1>Prenotazione</h1>
    <form @submit.prevent="onSubmit" class="not-prose flex flex-col gap-3">
      <div>
        <label for="Erogazione" class="block text-sm font-medium leading-6 text-gray-900">Erogazione</label>
        <select name="Erogazione"
                id="Erogazione"
                v-model="book.id_prestazione"
                @change="getDottore"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option v-for="service in services" :value="service.id" :key="service.id">
            {{ service?.titolo }}
          </option>
        </select>
      </div>
      <div>
        <label for="Dottore" class="block text-sm font-medium leading-6 text-gray-900">Dottore</label>
        <select name="Dottore"
                id="Dottore"
                v-model="book.id_doctor"
                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option v-for="doctor in doctors" :value="doctor.id_doctor" :key="doctor.id_doctor">
              Dott. {{ doctor?.doth_surname }} {{ doctor?.doth_name}}
          </option>
        </select>
      </div>
      <div>
        <input type="date" v-model="book.data_prenotazione" placeholder="Sceglie Giorno" class="rounded-lg border-slate-200"/>
        <input type="number" v-model="book.ora_prenotazione" name="booking_ora" min="8" max="18" value="8" step="1" placeholder="Sceglie ora" class="rounded-lg border-slate-200"/>
      </div>
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
      <div v-else >
        <div v-if="!errorStatus && errorStatus !== ''">
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