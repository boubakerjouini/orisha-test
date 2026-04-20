<script setup lang="ts">
import Sidebar from '@/components/organisms/Sidebar.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-bg-default">
    <Sidebar />
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
  </div>
</template>
