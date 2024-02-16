<script lang="ts">
  import {defineComponent, PropType} from "vue"
  import {Prestazione} from "../types";

  export default defineComponent({
    props: {
      service: Object as PropType<Prestazione>,
    },
  })

</script>

<template>
  <div>
    <div class="flex min-w-0 gap-x-4">
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">{{ service?.titolo }} $  {{ service?.costo }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>