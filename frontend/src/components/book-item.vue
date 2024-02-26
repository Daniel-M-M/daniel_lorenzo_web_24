<script lang="ts">
import axios from "axios"
import { PropType, defineComponent } from "vue"
import {Booking, Doctors, Prestazione, User} from "../types";

export default defineComponent({
  props: {
    user: Object as PropType<User>,
    //canDelete: Boolean,
  },
  emits: ["delete"],
  data() {
    return {
      book: {} as Booking,
      services: {} as Prestazione,
      doctors: {} as Doctors,
      errorMessage: "",
      errorStatus: "",
      allMyBooks: {},
    }
  },
  methods: {
    async deleteBooking() {
      await axios.delete(`/api/prenotation/$this.book.id}`)
      this.$emit("delete")
    },

    async getPrestazione() { // Per renderizzare nel template
      try {
        const response = await axios.get("/api/prestazioni/get");
        this.services = response.data //salvo tutte le prestazione qui
      } catch (error) {
        console.error("Errore durante il recupero del nome della prestazione:", error);
      }
    },

    async getDottore() {  // Per renderizzare nel template
      try {
        const response = await axios.get("/api/doctor/get");
        this.doctors = response.data
      } catch (error) {
        console.error("Errore durante il recupero del nome del dottore:", error);
      }
    },

    async getMyBookings() {
      try {
        const allMyBookings = await axios.get("/api/prenotation/")
        this.allMyBooks = allMyBookings.data.filter((book: { id_user: { toString: () => string; }}) =>
          book.id_user === this.$props.user?.id_user)
      } catch (e) {
        console.error("Error nel catch di getMyBookings", this.allMyBooks)
      }
    },
  },
  mounted() {
    this.getPrestazione()
    this.getDottore()
    this.getMyBookings()
    this.deleteBooking()
  },
})
</script>

<template>
  <!-- TODO risolvere cancella booking -->
  <!-- <button v-if="canDelete" @click="deleteBooking" class="btn rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancella</button> -->
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 mt-4">
    <div v-for="myBook in allMyBooks" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div class="min-w-0">
        <a class="focus:outline-none grid grid-cols-2 gap-1 sm:grid-cols-2">
          <span class="absolute inset-0" aria-hidden="true" />
          <div v-for="prestazione in services">
            <p v-if="prestazione.id === myBook.id_prestazione" class="text-sm font-medium text-gray-900">{{ prestazione.titolo }}</p>
          </div>
          <div v-for="doctor in doctors">
            <p v-if="doctor.id_doctor === myBook.id_doctor" class="truncate text-sm text-gray-500">Dott. {{ doctor.doth_surname }} {{ doctor.doth_name}}</p>
          </div>
          <p class="truncate text-sm text-gray-500">{{ myBook.data_prenotazione.split('T')[0].split('-').reverse().join('-') }} alle {{ myBook.ora_prenotazione}}</p>
          <button type="submit" @click="deleteBooking" class="absolute right-5 z-10 mt-5 w-30 origin-top-right rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Cancella</button>
        </a>
      </div>
    </div>
  </div>

</template>


<style scoped>

</style>