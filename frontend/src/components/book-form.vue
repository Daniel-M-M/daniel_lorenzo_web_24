<script lang="ts">
import axios from "axios";
import {ref, defineComponent} from "vue";
import {Switch, SwitchGroup, SwitchLabel} from '@headlessui/vue';

export default defineComponent({
  components: {SwitchLabel, Switch, SwitchGroup},
  emits: ["submit"],
  data() {
    return {
      content: "",
      iddoctor: "",
      bookingdate: "",
      bookinghours: "",
      handicap: "",
    }
  },
  computed: {
    canSubmit() {
      return this.content + this.iddoctor + this.bookingdate + this.bookinghours!= ""
    },
  },
  methods: {
    async onSubmit() {
      if (!this.canSubmit) return
      await axios.post("/api/prenotation", {
        content: this.content,
        iddoctor: this.iddoctor,
        bookingdate: this.bookingdate,
        bookinghours: this.bookinghours,
        handicap: this.handicap,
      })
      this.content = ""
      this.iddoctor = ""
      this.bookingdate = ""
      this.bookinghours = ""
      this.handicap = ""
      this.$emit("submit")
    },
  },
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="not-prose flex relative mb-10">
    <div>
      <label for="Erogazione" class="block text-sm font-medium leading-6 text-gray-900">Erogazione</label>
      <select id="Erogazione"
              name="Erogazione"
              v-model="content"
              class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <option selected="">Radiografia</option>
        <option>Mammografia</option>
        <option>Tomografia</option>
        <option>Risonanza Magnetica</option>
        <option>Cardiologia</option>
        <option>Neurologia</option>
      </select>
    </div>
    <div> <!-- TODO mettere collegamento tra nome dottore a users.iddoctor o creare un query per farlo -->
      <label for="Dottore" class="block text-sm font-medium leading-6 text-gray-900">Dottore</label>
      <select id="Dottore"
              name="Dottore"
              v-model="iddoctor"
              class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <option selected="">Dottore House</option>
        <option>Dottoressa Cuddly</option>
        <option>Dottore Wilson</option>
        <option>Dottore Foreman</option>
        <option>Dottore Chase</option>
        <option>Dottoressa Cameron</option>
      </select>
    </div>
    <div>
      <input type="date" v-model="bookingdate" placeholder="Sceglie Giorno"/>
      <input type="number" v-model="bookinghours" min="8" max="18" value="8" step="1" placeholder="Sceglie ora"/>
    </div>
    <div>
      <SwitchGroup as="div" class="flex items-center">
        <Switch v-model="handicap" :class="[handicap ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
          <span aria-hidden="true" :class="[handicap ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
        </Switch>
        <SwitchLabel as="span" class="ml-3 text-sm">
          <span class="font-medium text-gray-900">Handicap</span>
        </SwitchLabel>
      </SwitchGroup>
    </div>
    <button
        type="submit"
        class="btn !bg-blue-500 text-white disabled:!bg-slate-100 disabled:!text-slate-300 absolute bottom-5 right-5"
        :disabled="!canSubmit"
    >
      Prenota
    </button>
  </form>

</template>


<style scoped>

</style>