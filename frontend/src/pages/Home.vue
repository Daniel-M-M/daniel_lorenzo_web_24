<script lang="ts">

  import axios from "axios"
  import { defineComponent } from "vue"
  import BookForm from "../components/book-form.vue"
  import PrestazioneItem from "../components/prestazione_item.vue"
  import { Prestazione } from "../types"

  export default defineComponent({
    components: { BookForm, PrestazioneItem },
    data() {
      return {
        services: [] as Prestazione[],
      }
    },
    methods: {
      async getPrestazione() {
        const res = await axios.get("/api/prestazioni/get")
        this.services = res.data
      },
    },
    mounted() {
      this.getPrestazione()
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
    <div class="prose">

      <div v-if="services.length > 0" class="divide-y divide-gray-100">
        <PrestazioneItem
            v-for="service in services"
            :key="service.id"
            :service="service"
        />
      </div>
      <div v-else>
        <p>Non hai ancora prenotato una visita.</p>
      </div>
    </div>
    <p>E molto ancora...</p>
  </div>
<!-- <book-form>Prenota Una Visita</book-form>
      <BookForm v-if="user" @submit="getBooking" /> -->
</template>
