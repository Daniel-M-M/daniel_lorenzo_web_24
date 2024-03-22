<script lang="ts">
  import {defineComponent, PropType} from "vue"
  import {Doctors, Prestazione, User} from "../types";
  import axios from "axios";

  //TODO resolver il delete di dottore e aggiungere update
  export default defineComponent({
    props: {
      doctor: Object as PropType<Doctors>,
      user: Object as PropType<User>,
    },
    emits: ["delete", "update"],
    data() {
      return {
        errorMessage: "",
        errorStatus: false,
        nuovaPrestazione1: "",
        nuovaPrestazione2: "",
        nuovaPrestazione3: "",
        services: [] as Prestazione[],
      }
    },
    computed: {
      canSubmit(): any {
        // Condizione per abilitare l'invio // aggiungere l'obbligo di avere almeno una prestazione
        return this.nuovaPrestazione1 || this.nuovaPrestazione2 || this.nuovaPrestazione3 != ""
      },
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

      async updateDottore(prestazioneId: number | string) {
        try {
          const response = await axios.put(`/api/doctor/${prestazioneId}`, {
            nuovaPrestazione1: this.nuovaPrestazione1,
            nuovaPrestazione2: this.nuovaPrestazione2,
            nuovaPrestazione3: this.nuovaPrestazione3
          })
          this.nuovaPrestazione1 = ""
          this.nuovaPrestazione2 = ""
          this.nuovaPrestazione3 = ""
          this.$emit("update")

          this.errorMessage = response.data.message;
          this.errorStatus = response.data.success;

          setTimeout(() => {
            this.errorStatus = true;
            window.location.reload();
          }, 2000);

        } catch (error) {
          console.error("Errore durante la chiamata API per update:", error, this.errorMessage);
        }
      },
      async getServices() {
        const res = await axios.get("/api/prestazioni/get")
        this.services = res.data
      },
    },
    mounted() {
      this.getServices()
    }
  })
</script>

<script setup lang="ts">
 import { CheckCircleIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <div>
    <div v-if="!errorStatus" class="flex min-w-0 gap-x-4">
      <div class="flex-auto right-5 z-10 m-5 w-30">
        <p class="text-sm font-semibold leading-6 text-gray-900">Dott. {{ doctor?.doth_name }} {{ doctor?.doth_surname }}</p>
        <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p>Prestazione disponibile:</p>
          <div v-for="service in services">
            <p v-if="doctor?.prestazione1 === service.id"> {{ service?.titolo }} /</p>
            <p v-else-if="doctor?.prestazione2 === service.id"> {{ service?.titolo }} /</p>
            <p v-else-if="doctor?.prestazione3 === service.id"> {{ service?.titolo }}</p>
          </div>
        </div>
        <div>
          <div>
            <label for="nuovaPrestazione1" class="block text-sm font-medium leading-6 text-gray-900">Cambia Prestazione 1</label>
            <select id="nuovaPrestazione1"
                    name="nuovaPrestazione1"
                    v-model="nuovaPrestazione1"
                    class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option v-for="service in services" :value="service.id" :key="service.id">
                {{ service?.titolo }}
              </option>
            </select>
          </div>
          <div>
            <label for="nuovaPrestazione2" class="block text-sm font-medium leading-6 text-gray-900">Cambia Prestazione 2</label>
            <select id="nuovaPrestazione2"
                    name="nuovaPrestazione2"
                    v-model="nuovaPrestazione2"
                    class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option v-for="service in services" :value="service.id" :key="service.id">
                {{ service?.titolo }}
              </option>
            </select>
          </div>
          <div>
            <label for="nuovaPrestazione3" class="block text-sm font-medium leading-6 text-gray-900">Cambia Prestazione 3</label>
            <select id="nuovaPrestazione3"
                    name="nuovaPrestazione3"
                    v-model="nuovaPrestazione3"
                    class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <option v-for="service in services" :value="service.id" :key="service.id">
                {{ service?.titolo }}
              </option>
            </select>
          </div>
          <button v-if="user"
                  :disabled="!canSubmit"
                  @click="updateDottore(doctor?.id)"
                  :value="doctor?.id" type="submit"
                  class="absolute btn bottom-10 mx-2 rounded-full !bg-blue-500 text-white disabled:!bg-slate-100 disabled:!text-slate-300 bottom-0 right-5"
          >Update</button>
        </div>
        <button v-if="user"
                @click="cancellaDottore(doctor.id)"
                :value="doctor.id"
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