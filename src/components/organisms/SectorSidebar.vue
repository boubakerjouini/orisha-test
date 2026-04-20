<script setup lang="ts">
import { computed } from 'vue'
import { PhCheck } from '@phosphor-icons/vue'
import { useFilterStore } from '@/stores/filters'
import { useSectors } from '@/composables/useSectors'

const filterStore = useFilterStore()
const { sectorGroups } = useSectors()

const isAllSelected = computed(
  () => !filterStore.sector && !filterStore.subSector
)

function selectAll() {
  filterStore.setSector(null)
  filterStore.setSubSector(null)
}

function selectSubSector(sector: string, sub: string) {
  if (filterStore.sector === sector && filterStore.subSector === sub) {
    selectAll()
  } else {
    filterStore.setSector(sector)
    filterStore.setSubSector(sub)
  }
}
</script>

<template>
  <aside
    class="flex h-full w-[240px] shrink-0 flex-col gap-[24px] border-r border-stroke-primary bg-bg-surface p-[16px] overflow-y-auto"
  >
    <!-- Tous les secteurs -->
    <button
      class="flex h-[32px] w-full items-center gap-[4px] rounded-[6px] p-[8px]"
      @click="selectAll"
    >
      <span
        class="flex-1 truncate text-left text-[10px] font-semibold uppercase leading-normal tracking-[2px] text-neutral-500"
      >
        Tous les secteurs
      </span>
      <span
        class="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full"
        :class="
          isAllSelected
            ? 'bg-module-primary'
            : 'border border-stroke-primary bg-bg-surface'
        "
      >
        <PhCheck v-if="isAllSelected" :size="14" weight="bold" class="text-text-invert" />
      </span>
    </button>

    <!-- Sector groups -->
    <div
      v-for="group in sectorGroups"
      :key="group.label"
      class="flex flex-col gap-[4px]"
    >
      <!-- Sector header -->
      <div class="flex h-[32px] items-center gap-[4px] p-[8px]">
        <span
          class="flex-1 truncate text-[10px] font-semibold uppercase leading-normal tracking-[2px] text-neutral-500"
        >
          {{ group.label }}
        </span>
      </div>

      <!-- Sub-sectors -->
      <button
        v-for="sub in group.subSectors"
        :key="sub"
        class="flex h-[32px] w-full items-center gap-[4px] rounded-[6px] p-[8px] transition-colors hover:bg-neutral-50"
        @click="selectSubSector(group.label, sub)"
      >
        <span
          class="flex-1 truncate text-left text-[13px] font-medium leading-[19px] tracking-[-0.15px] text-text-primary"
        >
          {{ sub }}
        </span>
        <span
          class="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full"
          :class="
            filterStore.sector === group.label && filterStore.subSector === sub
              ? 'bg-module-primary'
              : 'border border-stroke-primary bg-bg-surface'
          "
        >
          <PhCheck
            v-if="filterStore.sector === group.label && filterStore.subSector === sub"
            :size="14"
            weight="bold"
            class="text-text-invert"
          />
        </span>
      </button>
    </div>
  </aside>
</template>
