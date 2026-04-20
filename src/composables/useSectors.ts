import { computed } from 'vue'
import { useResidents } from '@/composables/useResidents'

export interface SectorGroup {
  label: string
  subSectors: string[]
}

/**
 * Derives sector groups from residents data.
 * Each group contains a sector label and its sorted sub-sectors.
 */
export function useSectors() {
  const { data: residents } = useResidents()

  const sectorGroups = computed<SectorGroup[]>(() => {
    if (!residents.value) return []

    const map = new Map<string, Set<string>>()
    for (const r of residents.value) {
      const sector = r.secteurSousSecteur.libelleEtablissementSecteur
      const sub = r.secteurSousSecteur.libelleEtablissementSousSecteur
      if (!map.has(sector)) map.set(sector, new Set())
      map.get(sector)!.add(sub)
    }

    return Array.from(map.entries()).map(([label, subs]) => ({
      label,
      subSectors: Array.from(subs).sort(),
    }))
  })

  const allSectors = computed(() => sectorGroups.value.map((g) => g.label))

  return { sectorGroups, allSectors }
}
