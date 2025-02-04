<template>
  <div class="bg-gray-800">
    <ClientOnly>
      <Connection />
    </ClientOnly>
  </div>
</template>

<script >
import Connection from './components/Connection.vue'

export default {
  components: { Connection },
  setup() {
    return {
      isClient: process.client
    }
  }
}
</script>
