import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ViewMode } from '@/types/resident'

export const useFilterStore = defineStore('filters', () => {
  // State
  const search = ref('')
  const sector = ref<string | null>(null)
  const subSector = ref<string | null>(null)
  const status = ref<string | null>(null)
  const viewMode = ref<ViewMode>('list')

  // Getters
  const hasActiveFilters = computed(
    () => !!search.value || !!sector.value || !!subSector.value || !!status.value
  )

  const activeFilterCount = computed(() => {
    let count = 0
    if (sector.value) count++
    if (subSector.value) count++
    if (status.value) count++
    return count
  })

  // Actions
  function setSearch(value: string) {
    search.value = value
  }

  function setSector(value: string | null) {
    sector.value = value
    // Reset sub-sector when sector changes
    subSector.value = null
  }

  function setSubSector(value: string | null) {
    subSector.value = value
  }

  function setStatus(value: string | null) {
    status.value = value
  }

  function setViewMode(mode: ViewMode) {
    viewMode.value = mode
  }

  function resetFilters() {
    search.value = ''
    sector.value = null
    subSector.value = null
    status.value = null
  }

  return {
    // State
    search,
    sector,
    subSector,
    status,
    viewMode,
    // Getters
    hasActiveFilters,
    activeFilterCount,
    // Actions
    setSearch,
    setSector,
    setSubSector,
    setStatus,
    setViewMode,
    resetFilters,
  }
})
