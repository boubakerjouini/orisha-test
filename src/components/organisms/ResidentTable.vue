<script setup lang="ts">
import { PhFunnelSimple } from '@phosphor-icons/vue'
import ResidentRow from '@/components/molecules/ResidentRow.vue'
import type { Resident } from '@/types/resident'
import { useRouter } from 'vue-router'

defineProps<{
  residents: Resident[]
}>()

const router = useRouter()

function navigateToResident(id: string) {
  router.push({ name: 'resident-detail', params: { id } })
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
    class="w-full overflow-hidden rounded-[6px] border border-stroke-primary shadow-sm"
  >
    <!-- Header row -->
    <div class="flex w-full items-start">
      <div
        v-for="col in columns"
        :key="col.key"
        class="flex h-[40px] max-h-[40px] items-center gap-[4px] border-b border-stroke-primary bg-neutral-100 px-[16px]"
        :class="col.class"
      >
        <span
          v-if="col.label"
          class="text-[12px] font-medium leading-[18px] tracking-[-0.15px] text-text-secondary"
        >
          {{ col.label }}
        </span>
        <PhFunnelSimple v-if="col.hasFilter" :size="16" class="text-text-placeholder" />
      </div>
    </div>

    <!-- Body rows -->
    <ResidentRow
      v-for="resident in residents"
      :key="resident.id"
      :resident="resident"
      @click="navigateToResident"
    />
  </div>
</template>
