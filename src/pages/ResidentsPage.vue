<script setup lang="ts">
import AppHeader from '@/components/organisms/AppHeader.vue'
import FilterBar from '@/components/organisms/FilterBar.vue'
import ResidentTable from '@/components/organisms/ResidentTable.vue'
import ResidentGrid from '@/components/organisms/ResidentGrid.vue'
import EmptyState from '@/components/organisms/EmptyState.vue'
import { useFilteredResidents, useResidents } from '@/composables/useResidents'
import { useFilterStore } from '@/stores/filters'
import { computed } from 'vue'

const { data: allResidents } = useResidents()
const { filtered, isLoading } = useFilteredResidents()
const filterStore = useFilterStore()

const subtitle = computed(() => {
  const count = filtered.value.length
  return `${count} résident${count > 1 ? 's' : ''}`
})
</script>

<template>
  <div class="flex h-full flex-col gap-[24px] overflow-hidden p-[24px]">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex flex-1 items-center justify-center">
      <div
        class="h-[32px] w-[32px] animate-spin rounded-full border-[3px] border-neutral-200 border-t-module-primary"
      />
    </div>

    <template v-else>
      <!-- Title -->
      <AppHeader
        title="Tous les résidents"
        :subtitle="subtitle"
      />

      <!-- Actions bar -->
      <FilterBar />

      <!-- Content -->
      <div class="flex-1 overflow-y-auto">
        <EmptyState v-if="filtered.length === 0" />
        <ResidentTable v-else-if="filterStore.viewMode === 'list'" :residents="filtered" :all-residents="allResidents ?? []" />
        <ResidentGrid v-else :residents="filtered" />
      </div>
    </template>
  </div>
</template>
