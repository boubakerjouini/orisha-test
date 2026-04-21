<script setup lang="ts">
import { ref } from 'vue'
import { PhFunnelSimple } from '@phosphor-icons/vue'
import ResidentRow from '@/components/molecules/ResidentRow.vue'
import ResidentFilterPopover from '@/components/organisms/ResidentFilterPopover.vue'
import type { Resident } from '@/types/resident'
import { useRouter } from 'vue-router'
import { useFilterStore } from '@/stores/filters'

defineProps<{
  residents: Resident[]
  allResidents: Resident[]
}>()

const router = useRouter()
const filterStore = useFilterStore()
const showFilter = ref(false)
const filterButtonRef = ref<HTMLElement | null>(null)

function navigateToResident(id: string) {
  router.push({ name: 'resident-detail', params: { id } })
}

function onFilter(ids: Set<string> | null) {
  filterStore.setSelectedResidentIds(ids)
}

function toggleFilter(event: MouseEvent) {
  filterButtonRef.value = event.currentTarget as HTMLElement
  showFilter.value = !showFilter.value
}

const columns = [
  { key: 'resident', label: 'Résident', class: 'flex-1', hasFilter: true },
  { key: 'dateNaissance', label: 'Date de naissance', class: 'w-[132px]' },
  { key: 'ins', label: 'INS', class: 'w-[130px]' },
  { key: 'secteur', label: 'Secteur', class: 'w-[220px]' },
  { key: 'chambre', label: 'Chambre', class: 'w-[88px]' },
  { key: 'situation', label: 'Situation administrative', class: 'w-[177px]' },
  { key: 'actions', label: '', class: 'w-[52px]' },
]
</script>

<template>
  <div
    class="w-full"
  >
    <!-- Header row -->
    <div class="flex w-full items-start">
      <div
        v-for="col in columns"
        :key="col.key"
        class="relative flex h-[40px] max-h-[40px] items-center gap-[4px] border-b border-stroke-primary bg-neutral-100 px-[16px] whitespace-nowrap"
        :class="col.class"
      >
        <span
          v-if="col.label"
          class="text-[12px] font-medium leading-[18px] tracking-[-0.15px] text-text-secondary"
        >
          {{ col.label }}
        </span>
        <button
          v-if="col.hasFilter"
          class="flex items-center justify-center rounded-[4px] p-[2px] transition-colors hover:bg-neutral-200"
          :class="filterStore.hasResidentFilter ? 'text-module-primary' : 'text-text-placeholder'"
          @click.stop="toggleFilter"
        >
          <PhFunnelSimple :size="16" />
        </button>
      </div>
    </div>

    <!-- Filter popover (teleported to body to avoid overflow clipping) -->
    <Teleport to="body">
      <ResidentFilterPopover
        v-if="showFilter"
        :residents="allResidents"
        :trigger-ref="filterButtonRef"
        @filter="onFilter"
        @close="showFilter = false"
      />
    </Teleport>

    <!-- Body rows -->
    <ResidentRow
      v-for="resident in residents"
      :key="resident.id"
      :resident="resident"
      @click="navigateToResident"
    />
  </div>
</template>
