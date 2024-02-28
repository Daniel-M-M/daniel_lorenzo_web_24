<script lang="ts">

  import axios from "axios"
  import {defineComponent, PropType} from "vue"
  import PrestazioneItem from "../components/prestazione_item.vue"
  import { Prestazione } from "../types"

  export default defineComponent({
    components: { PrestazioneItem },
    data() {
      return {
        services: Object as PropType<Prestazione>,
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
    <h1 class="text-m font-semibold leading-6 text-gray-900">Dr. House Clinic</h1>
  </div>
  <div>
    <h2>Chi siamo:</h2>
    <p>
      Siamo una Clinica per i casi più strani che esistono e siamo capace di trovare una soluzione per i vostro problemi.
      Contiamo con la capacità intuitiva del nostro fondatore il Dr. House... più bravo medico di tutti i tempi.
      Siamo lieti di accogliervi nel nostro centro, sarete sicuramente soddisfatti o rimborsati caso non troviamo
      la risposta per i suoi mali.
    </p>
  </div>
  <div>
    <div class="prose">
      <div class="divide-y divide-gray-100">
        <h2 class="text-l font-semibold leading-6 text-gray-900">Le nostre specialità:</h2>
        <PrestazioneItem
            v-for="service in services"
            :service="service"
        />
        <p>E molto ancora...</p>
      </div>
    </div>
  </div>
</template>
