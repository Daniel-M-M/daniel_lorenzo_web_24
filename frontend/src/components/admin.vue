<template>
  <!-- TODO fare funzionare gli update di tutte le funzioni e vedere come farle-->
  <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-3">I nostri Servizi:</h1>
  <button v-if="!mostraComponentePresForm" @click="mostraPresForm" type="submit" class="flex-auto right-5 z-10 mt-5 w-30 origin-top-right rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{{ 'Crea Servizio' }}</button>
  <button v-if="mostraComponentePresForm" @click="nascondiPresForm" type="submit" class="flex-auto right-5 z-10 mt-5 w-30 origin-top-right rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{{ 'Chiude Form' }}</button>
  <PrestazioneForm v-if="mostraComponentePresForm"></PrestazioneForm>
  <div class="grid grid-cols-1 gap-2 sm:grid-cols-1 mt-2">
    <div v-for="service in services" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <PrestazioneItem :service="service" :user="user"></PrestazioneItem>
    </div>
  </div>
  <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-6">I nostri Dottori:</h1>
  <button v-if="!mostraComponenteDocForm" @click="mostraDocForm" type="submit" class="flex-auto right-5 z-10 mt-5 w-30 origin-top-right rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{{ 'Inserisce Dottore' }}</button>
  <button v-if="mostraComponenteDocForm" @click="nascondiDocForm" type="submit" class="flex-auto right-5 z-10 mt-5 w-30 origin-top-right rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{{ 'Chiude Form' }}</button>
  <DoctorsForm v-if="mostraComponenteDocForm"></DoctorsForm>
  <div class="grid grid-cols-1 gap-2 sm:grid-cols-1 mt-2">
    <div v-for="doctor in doctors" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <DottoreItem :doctor="doctor" :user="user"></DottoreItem>
    </div>
  </div>
  <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-6">Le prenotazione:</h1>
  <!-- TODO Inserisce utente deve inserire utente e determinare pure il role se possibile, cmq è un todo un po da vedere -->
  <div class="grid grid-cols-2 gap-2 sm:grid-cols-2 mt-2">
    <label for="Erogazione" class="block text-sm font-medium leading-6 text-gray-900">Selezionare il Dottore</label>
    <select name="Erogazione"
            id="Erogazione"
            v-model="selectedDoctor"
            @change="getBooksPerDottore"
            class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
      <option v-for="doctor in doctors" :value="doctor" :key="doctor">
        {{ doctor?.doth_name }} {{ doctor?.doth_surname }}
      </option>
    </select>
    <div v-for="docbook in doctorBookings" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div class="min-w-0">
        <a class="focus:outline-none grid grid-cols-1 gap-1 sm:grid-cols-1">
          <span class="absolute inset-0" aria-hidden="true" />
          <div v-for="prestazione in services">
            <p v-if="prestazione.id === docbook.id_prestazione" class="text-sm font-medium text-gray-900">{{ prestazione.titolo }}</p>
          </div>
          <div v-for="user in users">
            <p v-if="user.id_user === docbook.id_user" class="text-sm text-gray-500">Cliente: {{ user.user_name }} {{ user.user_surname}}</p>
          </div>
          <p class="truncate text-sm text-gray-500">Prenotato il: {{ docbook.data_prenotazione.split('T')[0].split('-').reverse().join('/') }} alle {{ docbook.ora_prenotazione}}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
  import {Booking, Doctors, Prestazione, User} from "../types";
  import axios from "axios";
  import PrestazioneItem from "./prestazione_item.vue"
  import DottoreItem from "./doctors-item.vue"
  import UserItem from "./user-item.vue";
  import PrestazioneForm from "./prestazione-form.vue";
  import DoctorsForm from "./doctors-form.vue";

  //TODO view delle prestazione per dottore
  export default defineComponent ({
    components: {DoctorsForm, PrestazioneItem, DottoreItem, UserItem, PrestazioneForm},
    name: "admin.vue",
    props: {
      user: Object as PropType<User>
    },
    data() {
      return {
        services: [] as Prestazione[] | null,
        doctors: [] as Doctors[] | null,
        users: [] as User[] | null,
        books: [] as Booking[] | null,
        mostraComponentePresForm: false,
        mostraComponenteDocForm: false,
        selectedDoctor: Object as PropType<Doctors>,
        doctorBookings: [] as Booking[] | null,
      }
    },
    methods: {
      async getServices() {
        const res = await axios.get("/api/prestazioni/get")
        this.services = res.data
      },
      async getDottore() {
        const res = await axios.get("/api/doctor/get")
        this.doctors = res.data
      },
      async getUser() {
        const res = await axios.get("/api/utente/get")
        this.users = res.data
      },
      async getBooksPerDottore() {
        const allDocBookings = await axios.get("/api/prenotation/")
        this.doctorBookings = allDocBookings.data.filter((book: { id_doctor: { toString: () => string; } }) =>
            book.id_doctor === this.selectedDoctor.id_doctor)
      },
      mostraPresForm() {
        this.mostraComponentePresForm = true;
      },
      mostraDocForm() {
        this.mostraComponenteDocForm = true;
      },
      nascondiPresForm() {
        this.mostraComponentePresForm = false;
      },
      nascondiDocForm() {
        this.mostraComponenteDocForm = false;
      },

    },
    mounted() {
      this.getServices()
      this.getDottore()
      this.getUser()
      this.getBooksPerDottore()
    },

  })
</script>

<style scoped>

</style>