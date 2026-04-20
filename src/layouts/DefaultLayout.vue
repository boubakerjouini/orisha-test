<script setup lang="ts">
import BreadcrumbBar from '@/components/molecules/BreadcrumbBar.vue'
import SectorSidebar from '@/components/organisms/SectorSidebar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isDetailPage = computed(() => route.name === 'resident-detail')
</script>

<template>
  <!-- Purple background wrapper -->
  <div class="flex h-screen w-full items-start bg-module-primary p-[8px]">
    <!-- White card container -->
    <div class="flex h-full w-full flex-col overflow-hidden rounded-[6px] bg-bg-default">
      <!-- Breadcrumb bar -->
      <BreadcrumbBar />

      <!-- Content area: sidebar + main -->
      <div class="flex flex-1 overflow-hidden">
        <SectorSidebar v-if="!isDetailPage" />
        <main class="flex-1 overflow-y-auto overflow-x-hidden">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
