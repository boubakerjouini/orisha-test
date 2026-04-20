<script setup lang="ts">
import AppHeader from '@/components/organisms/AppHeader.vue'
import FilterBar from '@/components/organisms/FilterBar.vue'
import ResidentTable from '@/components/organisms/ResidentTable.vue'
import ResidentGrid from '@/components/organisms/ResidentGrid.vue'
import EmptyState from '@/components/organisms/EmptyState.vue'
import { useFilteredResidents, useResidents } from '@/composables/useResidents'
import { useFilterStore } from '@/stores/filters'

const { data: allResidents } = useResidents()
const { filtered, total, isLoading } = useFilteredResidents()
const filterStore = useFilterStore()
</script>

<template>
  <div class="p-[24px]">
    <AppHeader title="Résidents" />

    <!-- Loading state -->
    <div v-if="isLoading" class="flex items-center justify-center py-[64px]">
      <div
        class="h-[32px] w-[32px] animate-spin rounded-full border-[3px] border-neutral-200 border-t-module-primary"
      />
    </div>

    <template v-else>
      <FilterBar
        :residents="allResidents ?? []"
        :filtered-count="filtered.length"
        :total-count="total"
      />

      <div class="mt-[16px]">
        <!-- Empty state -->
        <EmptyState v-if="filtered.length === 0" />

        <!-- List view -->
        <ResidentTable v-else-if="filterStore.viewMode === 'list'" :residents="filtered" />

        <!-- Grid view -->
        <ResidentGrid v-else :residents="filtered" />
      </div>
    </template>
  </div>
</template>
