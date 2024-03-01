<script lang="ts">
  import {defineComponent, PropType} from "vue"
  import {Prestazione, User} from "../types";
  import axios from "axios";

  //TODO aggiungere update
  export default defineComponent({
    props: {
      service: Object as PropType<Prestazione>,
      user: Object as PropType<User>,
    },
    emits: ["delete"],
    data() {
      return {
        errorMessage: "",
        errorStatus: Boolean,
      }
    },
    methods: {
      async deletePrestazione(prestazioneId: number | string) {
        try {
          const response = await axios.delete(`/api/prestazione/${prestazioneId}`)
          this.$emit("delete")

          this.errorMessage = response.data.message;
          this.errorStatus = response.data.success;

          setTimeout(() => {
            this.errorStatus = Boolean;
            window.location.reload();
          }, 2000);

        } catch (error) {
          console.error("Errore durante la chiamata API:", error);
        }
      },
    },
  })
</script>

<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div>
    <div v-if="errorStatus">
      <div class="flex-auto right-5 z-10 m-5 w-30">
        <p class="text-sm font-semibold leading-6 text-gray-900">Servizio: {{ service?.titolo }} $  {{ service?.costo }}</p>
        <p v-if="user" class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">Creato il: {{ service?.created_at.split('T')[0].split('-').reverse().join('-') }} / Aggiornato il: {{ service?.updated_at.split('T')[0].split('-').reverse().join('-') }}</p>
        <button v-if="user" @click="deletePrestazione(service.id)" :value="service.id" type="submit" class="absolute right-1 top-6 m-5 w-30 rounded-full bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Cancella</button>
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