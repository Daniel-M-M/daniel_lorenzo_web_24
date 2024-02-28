<template>
  <h1>I nostri Servizi:</h1>
  <div v-for="service in services">
    <PrestazioneItem :service="service"></PrestazioneItem>
  </div>
  <h1>I nostri Dottori:</h1>
  <div v-for="doctor in doctors">
    <DottoreItem :doctor="doctor"></DottoreItem>
  </div>
  <h1>I nostri Utenti:</h1>
  <div v-for="user in users">
    <UserItem :user="user"></UserItem>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from "vue";
  import {Doctors, Prestazione, User} from "../types";
  import axios from "axios";
  import PrestazioneItem from "./prestazione_item.vue"
  import DottoreItem from "./doctors-item.vue"
  import UserItem from "./user-item.vue";

  export default defineComponent ({
    components: {PrestazioneItem, DottoreItem, UserItem},
    name: "admin.vue",
    data() {
      return {
        services: null as Prestazione | null,
        doctors: null as Doctors | null,
        users: null as User | null,
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
        const res = await axios.get("/api/utente/get")//TODO aggiungere il get user
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