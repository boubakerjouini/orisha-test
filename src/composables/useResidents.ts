import { useQuery } from '@tanstack/vue-query'
import { computed, watch } from 'vue'
import { fetchResidents, fetchResidentById } from '@/api/residents'
import type { Resident } from '@/types/resident'
import { useFilterStore } from '@/stores/filters'

/** Query key factory — keeps cache keys consistent */
export const residentKeys = {
  all: ['residents'] as const,
  detail: (id: string) => ['residents', id] as const,
}

/**
 * Fetch all residents with TanStack Query.
 * Provides: data, isLoading, isError, refetch
 */
export function useResidents() {
  return useQuery<Resident[]>({
    queryKey: residentKeys.all,
    queryFn: fetchResidents,
    staleTime: 5 * 60 * 1000, // 5 min
  })
}

/**
 * Fetch a single resident by ID.
 */
export function useResident(id: () => string) {
  return useQuery<Resident | undefined>({
    queryKey: computed(() => residentKeys.detail(id())),
    queryFn: () => fetchResidentById(id()),
    enabled: computed(() => !!id()),
  })
}

/**
 * Returns filtered + searched residents based on Pinia filter store.
 */
export function useFilteredResidents() {
  const { data: residents, isLoading, isError } = useResidents()
  const filterStore = useFilterStore()

  const filtered = computed<Resident[]>(() => {
    if (!residents.value) return []

    return residents.value.filter((r) => {
      // Search filter
      if (filterStore.search) {
        const q = filterStore.search.toLowerCase()
        const matchesSearch =
          r.nomComplet.toLowerCase().includes(q) ||
          r.chambre.libelleEtablissementChambre.includes(q) ||
          r.ins.includes(q) ||
          r.secteurSousSecteur.libelleComplet.toLowerCase().includes(q)
        if (!matchesSearch) return false
      }

      // Sector filter
      if (filterStore.sector) {
        if (r.secteurSousSecteur.libelleEtablissementSecteur !== filterStore.sector) return false
      }

      // Sub-sector filter
      if (filterStore.subSector) {
        if (r.secteurSousSecteur.libelleEtablissementSousSecteur !== filterStore.subSector)
          return false
      }

      // Status filter
      if (filterStore.status) {
        if (r.situationAdministrative.texte !== filterStore.status) return false
      }

      // Resident ID filter (from column filter popover)
      if (filterStore.selectedResidentIds) {
        if (!filterStore.selectedResidentIds.has(r.id)) return false
      }

      return true
    })
  })

  const total = computed(() => residents.value?.length ?? 0)

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filtered.value.length / filterStore.pageSize))
  )

  const paginated = computed<Resident[]>(() => {
    const start = (filterStore.currentPage - 1) * filterStore.pageSize
    return filtered.value.slice(start, start + filterStore.pageSize)
  })

  // Clamp page if filters reduce results
  watch(totalPages, (n) => {
    if (filterStore.currentPage > n) filterStore.currentPage = Math.max(1, n)
  })

  return { filtered, paginated, totalPages, total, isLoading, isError }
}
