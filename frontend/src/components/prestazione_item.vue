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
    emits: ["delete", "update"],
    data() {
      return {
        nuovoCosto: "",
        errorMessage: "",
        errorStatus: false,
      }
    },
    computed: {
      canSubmit(): any {
        // Condizione per abilitare l'invio // aggiungere l'obbligo di avere almeno una prestazione
        return this.nuovoCosto != ""
      },
    },
    methods: {
      async deletePrestazione(prestazioneId: number | string) {
        try {
          const response = await axios.delete(`/api/prestazione/${prestazioneId}`)
          this.$emit("delete")

          this.errorMessage = response.data.message;
          this.errorStatus = response.data.success;

          setTimeout(() => {
            this.errorStatus = false;
            window.location.reload();
          }, 2000);

        } catch (error) {
          console.error("Errore durante la chiamata API per delete:", error);
        }
      },

      async updatePrestazione(prestazioneId: number | string) {
        try {
          const response = await axios.put(`/api/prestazione/${prestazioneId}`, {
            costo: this.nuovoCosto,
          })
          this.nuovoCosto = ""
          this.$emit("update")

          this.errorMessage = response.data.message;
          this.errorStatus = response.data.success;

          setTimeout(() => {
            this.errorStatus = false;
            window.location.reload();
          }, 2000);

        } catch (error) {
          console.error("Errore durante la chiamata API per update:", error);
        }
      },
    },
  })
</script>

<script setup lang="ts">
  import { CheckCircleIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div>
    <div v-if="!errorStatus">
      <div class="flex-auto right-5 z-10 m-5 w-30">
        <p class="text-sm font-semibold leading-6 text-gray-900"> {{ service?.titolo }} $  {{ service?.costo }}</p>
        <p v-if="user" class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">Creato il: {{ service?.created_at.split('T')[0].split('-').reverse().join('-') }} / Aggiornato il: {{ service?.updated_at.split('T')[0].split('-').reverse().join('-') }}</p>
        <div v-if="user">
          <label for="nuovoCosto" class="block text-sm font-medium leading-6 text-gray-900">Cambia prezzo: </label>
          <input
              id="nuovoCosto"
              name="nuovoCosto"
              type="text"
              v-model="nuovoCosto"
              class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              autocomplete="nuovoCosto"
          />
          <button v-if="user"
                  :disabled="!canSubmit"
                  @click="updatePrestazione(service.id)"
                  :value="service.id" type="submit"
                  class="absolute btn bottom-10 mx-2 rounded-full !bg-blue-500 text-white disabled:!bg-slate-100 disabled:!text-slate-300 bottom-0 right-5"
          >Update</button>
        </div>
        <button v-if="user"
                @click="deletePrestazione(service.id)"
                :value="service.id"
                type="submit"
                class="absolute right-1 top-6 m-5 w-30 rounded-full bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >Cancella</button>
      </div>
    </div>
    <div v-else>
      <div class="rounded-md bg-green-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>