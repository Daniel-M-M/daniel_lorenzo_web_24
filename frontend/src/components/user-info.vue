<script lang="ts">
import axios from "axios"
import { PropType, defineComponent } from "vue"
import { User } from "../types"

export default defineComponent({
  props: {
    user: Object as PropType<User>,
  },
  methods: {
    async logout() {
      await axios.post("/api/auth/logout")
      window.location.reload()
    },
  },
})
</script>

<template>
  <span class="text-sm">{{ user?.username }}</span>
  <div
    class="h-9 w-9 flex rounded-full"
    :class="{ 'bg-blue-500': user?.role != 'admin', 'bg-rose-500': user?.role == 'admin' }"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      class="h-5 w-5 text-white/70 m-auto"
    >
      <path
        fill="currentColor"
        d="M10 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm-6.535 6.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1c.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"
      />
    </svg>
  </div>
  <button class="btn !px-2" @click="logout">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5">
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
      />
    </svg>
  </button>
</template>
