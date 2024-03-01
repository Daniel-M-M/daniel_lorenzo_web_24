<script lang="ts">
  import {defineComponent, PropType} from "vue"
  import {Prestazione, User} from "../types";

  export default defineComponent({
    props: {
      service: Object as PropType<Prestazione>,
      user: Object as PropType<User>,
    },
  })

</script>

<template>
  <div>
    <div class="flex min-w-0 gap-x-4">
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">Servizio: {{ service?.titolo }} $  {{ service?.costo }}</p>
        <p v-if="user" class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">Creato il: {{ service?.created_at.split('T')[0].split('-').reverse().join('-') }} / Aggiornato il: {{ service?.updated_at.split('T')[0].split('-').reverse().join('-') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>