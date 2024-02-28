<template>
  <div>
    <div class="flex min-w-0 gap-x-4">
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">Nome: {{ user?.user_name }} {{ user?.user_surname }}</p>
        <p class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">Email: {{ user?.email_address }} / Access Level: {{ user?.role }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, PropType} from "vue"
  import {User} from "../types";

  export default defineComponent({
    props: {
      user: Object as PropType<User>,
    },
  })
</script>

<style scoped>

</style>