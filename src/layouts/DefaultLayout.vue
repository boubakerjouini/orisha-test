<script setup lang="ts">
import BreadcrumbBar from '@/components/molecules/BreadcrumbBar.vue'
import SectorSidebar from '@/components/organisms/SectorSidebar.vue'
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { useFilterStore } from '@/stores/filters'

const route = useRoute()
const filterStore = useFilterStore()
const isDetailPage = computed(() => route.name === 'resident-detail')

watch(() => route.path, () => {
  filterStore.mobileSidebarOpen = false
})
</script>

<template>
  <!-- Purple background wrapper -->
  <div class="flex h-screen w-full items-start bg-module-primary p-[4px] md:p-[8px]">
    <!-- White card container -->
    <div class="flex h-full w-full flex-col overflow-hidden rounded-[6px] bg-bg-default">
      <!-- Breadcrumb bar -->
      <BreadcrumbBar />

      <!-- Content area: sidebar + main -->
      <div class="relative flex flex-1 overflow-hidden">
        <!-- Desktop sidebar -->
        <SectorSidebar v-if="!isDetailPage" class="hidden md:flex" />

        <!-- Mobile sidebar drawer -->
        <Teleport to="body">
          <Transition name="drawer">
            <div
              v-if="!isDetailPage && filterStore.mobileSidebarOpen"
              class="fixed inset-0 z-50 flex md:hidden"
            >
              <div
                class="absolute inset-0 bg-black/40"
                @click="filterStore.mobileSidebarOpen = false"
              />
              <SectorSidebar class="relative z-10 h-full shadow-lg" />
            </div>
          </Transition>
        </Teleport>

        <main class="flex-1 overflow-y-auto overflow-x-hidden">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<style>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease;
}
.drawer-enter-active > aside,
.drawer-leave-active > aside {
  transition: transform 0.2s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from > aside {
  transform: translateX(-100%);
}
.drawer-leave-to > aside {
  transform: translateX(-100%);
}
</style>
