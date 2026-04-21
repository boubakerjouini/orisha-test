import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { ViewMode } from '@/types/resident'

export const useFilterStore = defineStore('filters', () => {
  // State
  const search = ref('')
  const sector = ref<string | null>(null)
  const subSector = ref<string | null>(null)
  const status = ref<string | null>(null)
  const selectedResidentIds = ref<Set<string> | null>(null)
  const viewMode = ref<ViewMode>('list')
  const currentPage = ref(1)
  const pageSize = ref(20)
  const mobileSidebarOpen = ref(false)

  // Getters
  const hasActiveFilters = computed(
    () =>
      !!search.value ||
      !!sector.value ||
      !!subSector.value ||
      !!status.value ||
      selectedResidentIds.value !== null
  )

  const hasResidentFilter = computed(() => selectedResidentIds.value !== null)

  // Actions
  function setSearch(value: string) {
    search.value = value
  }

  // Reset page on search change (v-model bypasses setter)
  watch(search, () => {
    currentPage.value = 1
  })

  function setSector(value: string | null) {
    sector.value = value
    subSector.value = null
    currentPage.value = 1
  }

  function setSubSector(value: string | null) {
    subSector.value = value
    currentPage.value = 1
  }

  function setStatus(value: string | null) {
    status.value = value
    currentPage.value = 1
  }

  function setSelectedResidentIds(ids: Set<string> | null) {
    selectedResidentIds.value = ids
    currentPage.value = 1
  }

  function setCurrentPage(page: number) {
    currentPage.value = page
  }

  function setPageSize(size: number) {
    pageSize.value = size
    currentPage.value = 1
  }

  function setViewMode(mode: ViewMode) {
    viewMode.value = mode
  }

  function toggleMobileSidebar() {
    mobileSidebarOpen.value = !mobileSidebarOpen.value
  }

  function resetFilters() {
    search.value = ''
    sector.value = null
    subSector.value = null
    status.value = null
    selectedResidentIds.value = null
    currentPage.value = 1
  }

  return {
    search,
    sector,
    subSector,
    status,
    selectedResidentIds,
    viewMode,
    hasActiveFilters,
    hasResidentFilter,
    setSearch,
    setSector,
    setSubSector,
    setStatus,
    setSelectedResidentIds,
    setViewMode,
    setCurrentPage,
    setPageSize,
    currentPage,
    pageSize,
    resetFilters,
    mobileSidebarOpen,
    toggleMobileSidebar,
  }
})
