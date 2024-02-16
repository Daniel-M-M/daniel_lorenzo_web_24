<script lang="ts">
import axios from "axios"
import { PropType, defineComponent } from "vue"
import {Booking, Doctors, Prestazione} from "../types";

export default defineComponent({
  props: {
    book: Object as PropType<Booking>,
    doctor: Object as PropType<Doctors>,
    prestazione: Object as PropType<Prestazione>,
    canDelete: Boolean,
  },
  emits: ["delete"],
  methods: {
    async deleteBooking() {
      await axios.delete(`/api/prenotation/${this.book?.id}`)
      this.$emit("delete")
    },
  },
})
</script>

<template>

  <div>
    <div class="flex min-w-0 gap-x-4">
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">{{ prestazione?.titolo }}</p>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ book?.data_prenotazione }} - {{ book?.ora_prenotazione }}</p>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ book?.id_user }} - {{ doctor?.doth_surname }}, {{ doctor?.doth_surname }}</p>
      </div>
    </div>
    <button v-if="canDelete" @click="deleteBooking" class="btn rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancella</button>
  </div>

</template>


<style scoped>

</style>