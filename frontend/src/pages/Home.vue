<script lang="ts">

import axios from "axios"
import { PropType, defineComponent } from "vue"
import BookForm from "../components/book-form.vue"
import BookItem from "../components/book-item.vue"
import { Booking, User } from "../types"

export default defineComponent({
  components: { BookForm, BookItem },
  props: {
    user: Object as PropType<User>,
  },
  data() {
    return {
      books: [] as Booking[],
    }
  },
  methods: {
    async getBooking() {
      const res = await axios.get("/api/allprenotations")
      this.books = res.data
    },
  },
  mounted() {
    this.getBooking()
  },
})
</script>

<template>
  <div>
    <h1>Dr. House Clinic</h1>
  </div>
  <div>
    <h3>Chi siamo:</h3>
    <p>
      Siamo una Clinica per i casi più strani che esistono e siamo capace di trovare una soluzione per i vostro problemi.
      Contiamo con la capacità intuitiva del nostro fondatore il Dr. House... più bravo medico di tutti i tempi.
      Siamo lieti di accogliervi nel nostro centro, sarete sicuramente soddisfatti o rimborsati caso non troviamo
      la risposta per i suoi mali.
    </p>
  </div>
  <div>
    <h3>Le nostre principali specialità:</h3>
    <ul>
      <li>Radiografia</li>
      <li>Mammografia</li>
      <li>Tomografia</li>
      <li>RMagnetica</li>
      <li>Cardiologia</li>
      <li>Neurologia</li>
    </ul>
    <p>E molto ancora...</p>
  </div>
  <div class="prose">
    <BookForm v-if="user" @submit="getBooking" />
    <h3>Le mie prenotazioni</h3>
    <div v-if="books.length > 0" class="divide-y divide-gray-100">
      <BookItem
        v-for="book in books"
        :key="book.id_prestazione"
        :post="book"
        :canDelete="book.id_user === user?.id_user || user?.role === 'admin'"
        @delete="getBooking"
        class="flex items-center justify-between gap-x-6 py-5"
      />
    </div>
    <div v-else>
      <p>Non hai ancora prenotato una visita.</p>
    </div>
  </div>
</template>
