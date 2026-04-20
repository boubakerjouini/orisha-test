<script setup lang="ts">
import { computed } from 'vue'
import { PhFunnelSimple, PhPlus } from '@phosphor-icons/vue'
import SearchInput from '@/components/atoms/SearchInput.vue'
import ViewToggle from '@/components/atoms/ViewToggle.vue'
import IconButton from '@/components/atoms/IconButton.vue'
import FilterDropdown from '@/components/molecules/FilterDropdown.vue'
import { useFilterStore } from '@/stores/filters'
import type { Resident } from '@/types/resident'

const props = defineProps<{
  residents: Resident[]
  filteredCount: number
  totalCount: number
}>()

const filterStore = useFilterStore()

// Extract unique sectors from data
const sectors = computed(() => {
  const set = new Set(props.residents.map((r) => r.secteurSousSecteur.libelleEtablissementSecteur))
  return Array.from(set).sort()
})

// Extract sub-sectors based on selected sector
const subSectors = computed(() => {
  const source = filterStore.sector
    ? props.residents.filter(
        (r) => r.secteurSousSecteur.libelleEtablissementSecteur === filterStore.sector
      )
    : props.residents
  const set = new Set(source.map((r) => r.secteurSousSecteur.libelleEtablissementSousSecteur))
  return Array.from(set).sort()
})

// Extract unique statuses
const statuses = computed(() => {
  const set = new Set(props.residents.map((r) => r.situationAdministrative.texte))
  return Array.from(set).sort()
})
</script>

<template>
  <div class="flex flex-col gap-[12px]">
    <!-- Top row: Search + View toggle + Add button -->
    <div class="flex items-center gap-[8px]">
      <div class="w-[280px]">
        <SearchInput v-model="filterStore.search" />
      </div>

      <div class="ml-auto flex items-center gap-[8px]">
        <ViewToggle v-model="filterStore.viewMode" />
        <IconButton aria-label="Ajouter un résident">
          <PhPlus :size="16" />
        </IconButton>
      </div>
    </div>

    <!-- Filter row -->
    <div class="flex items-center gap-[8px]">
      <div class="flex items-center gap-[6px] text-[13px] text-text-tertiary">
        <PhFunnelSimple :size="16" />
        <span>Filtres</span>
      </div>

      <FilterDropdown
        label="Secteur"
        :options="sectors"
        :model-value="filterStore.sector"
        @update:model-value="filterStore.setSector"
      />

      <FilterDropdown
        label="Sous-secteur"
        :options="subSectors"
        :model-value="filterStore.subSector"
        @update:model-value="filterStore.setSubSector"
      />

      <FilterDropdown
        label="Statut"
        :options="statuses"
        :model-value="filterStore.status"
        @update:model-value="filterStore.setStatus"
      />

      <button
        v-if="filterStore.hasActiveFilters"
        class="text-[12px] text-module-primary hover:underline"
        @click="filterStore.resetFilters()"
      >
        Réinitialiser
      </button>

      <span class="ml-auto text-[12px] text-text-tertiary">
        {{ filteredCount }} / {{ totalCount }} résidents
      </span>
    </div>
  </div>
</template>
