<template>
  <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-3">I nostri Servizi:</h1>
  <button v-if="!mostraComponentePresForm" @click="mostraPresForm" :value="services" type="submit" class="flex-auto right-5 z-10 mt-5 w-30 origin-top-right rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{{ 'Crea Servizio' }}</button>
  <button v-if="mostraComponentePresForm" @click="nascondiPresForm" type="submit" class="flex-auto right-5 z-10 mt-5 w-30 origin-top-right rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{{ 'Chiude Form' }}</button>
  <PrestazioneForm v-if="mostraComponentePresForm"></PrestazioneForm>
  <div class="grid grid-cols-1 gap-2 sm:grid-cols-1 mt-2">
    <div v-for="service in services" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <PrestazioneItem :service="service" :user="user"></PrestazioneItem>
      <button @click="" :value="services" type="submit" class="flex right-5 z-10 m-5 w-30 rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">update</button>
      <button @click="" :value="services" type="submit" class="flex right-5 z-10 m-5 w-30 rounded-full bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">delete</button>
    </div>
  </div>
  <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-6">I nostri Dottori:</h1>
  <button @click="" :value="services" type="submit" class="flex-auto right-5 z-10 mt-5 w-30 origin-top-right rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Inserisce Dottore</button>
  <div class="grid grid-cols-1 gap-2 sm:grid-cols-1 mt-2">
    <div v-for="doctor in doctors" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <DottoreItem :doctor="doctor"></DottoreItem>
      <button @click="" :value="services" type="submit" class="flex right-5 z-10 m-5 w-30 rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">update</button>
      <button @click="" :value="services" type="submit" class="flex right-5 z-10 m-5 w-30 rounded-full bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">delete</button>
    </div>
  </div>
  <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-6">I nostri Utenti:</h1>
  <!-- TODO Inserisce utente deve inserire utente e determinare pure il role se possibile, cmq è un todo un po da vedere -->
  <button @click="" :value="services" type="submit" class="flex-auto right-5 z-10 mt-5 w-30 origin-top-right rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Inserisce Utente</button>
  <div class="grid grid-cols-1 gap-2 sm:grid-cols-1 mt-2">
    <div v-for="user in users" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <UserItem :user="user"></UserItem>
      <button @click="" :value="services" type="submit" class="flex right-5 z-10 m-5 w-30 rounded-full bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">update</button>
      <button @click="" :value="services" type="submit" class="flex right-5 z-10 m-5 w-30 rounded-full bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
  import {Doctors, Prestazione, User} from "../types";
  import axios from "axios";
  import PrestazioneItem from "./prestazione_item.vue"
  import DottoreItem from "./doctors-item.vue"
  import UserItem from "./user-item.vue";
  import PrestazioneForm from "./prestazione-form.vue";

  //TODO aggiungere funzionalità ai bottoni e forse ordinarli. Aggiungere la view delle prenotazione per dottori.

  export default defineComponent ({
    components: {PrestazioneItem, DottoreItem, UserItem, PrestazioneForm},
    name: "admin.vue",
    props: {
      user: Object as PropType<User>
    },
    data() {
      return {
        services: [] as Prestazione[] | null,
        doctors: [] as Doctors[] | null,
        users: [] as User[] | null,
        mostraComponentePresForm: false,
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
      mostraPresForm() {
        this.mostraComponentePresForm = true;
      },
      nascondiPresForm() {
        this.mostraComponentePresForm = false;
      }

    },
    mounted() {
      this.getServices()
      this.getDottore()
      this.getUser()
    },

  })
</script>

<style scoped>

</style>