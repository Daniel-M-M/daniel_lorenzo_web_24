<template>
  <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-3">I nostri Servizi:</h1>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 mt-4">
    <div v-for="service in services" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <PrestazioneItem :service="service"></PrestazioneItem>
    </div>
  </div>
  <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-3">I nostri Dottori:</h1>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 mt-4">
    <div v-for="doctor in doctors" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <DottoreItem :doctor="doctor"></DottoreItem>
    </div>
  </div>
  <h1 class="text-2xl font-bold tracking-tight text-gray-900 mt-3">I nostri Utenti:</h1>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 mt-4">
    <div v-for="user in users" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <UserItem :user="user"></UserItem>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from "vue";
  import {Doctors, Prestazione, User} from "../types";
  import axios from "axios";
  import PrestazioneItem from "./prestazione_item.vue"
  import DottoreItem from "./doctors-item.vue"
  import UserItem from "./user-item.vue";

  //TODO aggiungere i buttons create/update/delete: update e delete sara all'interno del ciclo for e create fuori di ogni ciclo

  export default defineComponent ({
    components: {PrestazioneItem, DottoreItem, UserItem},
    name: "admin.vue",
    data() {
      return {
        services: [] as Prestazione[] | null,
        doctors: [] as Doctors[] | null,
        users: [] as User[] | null,
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