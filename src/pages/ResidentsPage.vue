<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/organisms/AppHeader.vue'
import FilterBar from '@/components/organisms/FilterBar.vue'
import ResidentTable from '@/components/organisms/ResidentTable.vue'
import ResidentGrid from '@/components/organisms/ResidentGrid.vue'
import EmptyState from '@/components/organisms/EmptyState.vue'
import PaginationBar from '@/components/molecules/PaginationBar.vue'
import { useFilteredResidents, useResidents } from '@/composables/useResidents'
import { useFilterStore } from '@/stores/filters'

const route = useRoute()
const router = useRouter()
const { data: allResidents } = useResidents()
const filterStore = useFilterStore()

// Init pagination from URL query params
const validSizes = [5, 10, 20, 50]
const initialPage = Number(route.query.page) || 1
const initialSize = validSizes.includes(Number(route.query.size))
  ? Number(route.query.size)
  : 20
filterStore.currentPage = initialPage
filterStore.pageSize = initialSize

const { filtered, paginated, totalPages, isLoading } = useFilteredResidents()

// Sync store → URL (skip defaults for clean URLs)
watch(
  () => [filterStore.currentPage, filterStore.pageSize],
  ([page, size]) => {
    const query: Record<string, string> = {}
    if (page > 1) query.page = String(page)
    if (size !== 20) query.size = String(size)
    router.replace({ query })
  }
)

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
      <div class="flex min-h-0 flex-1 flex-col">
        <div class="flex-1 overflow-y-auto">
          <EmptyState v-if="filtered.length === 0" />

          <!-- List view: table + pagination in same bordered card -->
          <div
            v-else-if="filterStore.viewMode === 'list'"
            class="overflow-hidden rounded-[6px] border border-stroke-primary shadow-sm"
          >
            <ResidentTable :residents="paginated" :all-residents="allResidents ?? []" />
            <PaginationBar
              :current-page="filterStore.currentPage"
              :total-pages="totalPages"
              :total-items="filtered.length"
              :page-size="filterStore.pageSize"
              @update:current-page="filterStore.setCurrentPage"
              @update:page-size="filterStore.setPageSize"
            />
          </div>

          <!-- Grid view: grid + pagination below -->
          <template v-else>
            <ResidentGrid :residents="paginated" />
            <PaginationBar
              class="mt-[16px] rounded-[6px] border border-stroke-primary shadow-sm"
              :current-page="filterStore.currentPage"
              :total-pages="totalPages"
              :total-items="filtered.length"
              :page-size="filterStore.pageSize"
              @update:current-page="filterStore.setCurrentPage"
              @update:page-size="filterStore.setPageSize"
            />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
