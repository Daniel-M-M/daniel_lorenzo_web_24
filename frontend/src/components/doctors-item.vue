<template>
  <div>
    <div class="flex min-w-0 gap-x-4">
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">Dott. {{ doctor?.doth_name }} {{ doctor?.doth_surname }}</p>
        <p class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">Prestazione Svolte {{ doctor?.prestazione1 }} / {{ doctor?.prestazione2 }} / {{ doctor?.prestazione3 }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, PropType} from "vue"
  import {Doctors} from "../types";

  export default defineComponent({
    props: {
      doctor: Object as PropType<Doctors>,
    },
  })
</script>

<style scoped>

</style>