<script lang="ts">
  import {defineComponent, PropType} from "vue"
  import {Doctors, User} from "../types";
  import axios from "axios";

  //TODO resolver il delete di dottore e aggiungere update
  export default defineComponent({
    props: {
      doctor: Object as PropType<Doctors>,
      user: Object as PropType<User>,
    },
    emits: ["delete"],
    data() {
      return {
        errorMessage: "",
        errorStatus: false,
      }
    },
    methods: {
      async cancellaDottore(doctorId: number) {
        try {
          const response = await axios.delete(`/api/doctor/${doctorId}`);
          this.$emit("delete");

          this.errorMessage = response.data.message;
          this.errorStatus = response.data.success;

          setTimeout(() => {
            this.errorStatus = false;
            window.location.reload();
          }, 2000);

        } catch (e) {
          console.error("Errore durante la chiamata API:", e);
          console.error(this.errorMessage, this.errorStatus)
        }
      },
    }
  })
</script>

<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div>
    <div v-if="!errorStatus" class="flex min-w-0 gap-x-4">
      <div class="flex-auto right-5 z-10 m-5 w-30">
        <p class="text-sm font-semibold leading-6 text-gray-900">Dott. {{ doctor?.doth_name }} {{ doctor?.doth_surname }}</p>
        <p class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">Prestazione Svolte {{ doctor?.prestazione1 }} / {{ doctor?.prestazione2 }} / {{ doctor?.prestazione3 }}</p>
        <button @click="cancellaDottore(doctor.id)" :value="doctor.id" type="submit" class="absolute right-1 top-6 m-5 w-30 rounded-full bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Cancella</button>
      </div>
    </div>
    <div v-else>
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
</template>

<style scoped>

</style>