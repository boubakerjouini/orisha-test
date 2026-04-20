<script setup lang="ts">
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
</script>

<template>
  <div class="overflow-hidden rounded-[8px] border border-stroke-secondary bg-bg-surface">
    <table class="w-full">
      <thead>
        <tr class="border-b border-stroke-secondary bg-neutral-50">
          <th
            class="py-[8px] pl-[16px] pr-[12px] text-left text-[10px] font-semibold uppercase tracking-[2px] text-text-tertiary"
          >
            Nom
          </th>
          <th
            class="py-[8px] px-[12px] text-left text-[10px] font-semibold uppercase tracking-[2px] text-text-tertiary"
          >
            Âge
          </th>
          <th
            class="py-[8px] px-[12px] text-left text-[10px] font-semibold uppercase tracking-[2px] text-text-tertiary"
          >
            Date de naissance
          </th>
          <th
            class="py-[8px] px-[12px] text-left text-[10px] font-semibold uppercase tracking-[2px] text-text-tertiary"
          >
            INS
          </th>
          <th
            class="py-[8px] px-[12px] text-left text-[10px] font-semibold uppercase tracking-[2px] text-text-tertiary"
          >
            Secteur
          </th>
          <th
            class="py-[8px] px-[12px] text-center text-[10px] font-semibold uppercase tracking-[2px] text-text-tertiary"
          >
            Chambre
          </th>
          <th
            class="py-[8px] px-[12px] text-left text-[10px] font-semibold uppercase tracking-[2px] text-text-tertiary"
          >
            Statut
          </th>
          <th class="w-[40px]"></th>
        </tr>
      </thead>
      <tbody>
        <ResidentRow
          v-for="resident in residents"
          :key="resident.id"
          :resident="resident"
          @click="navigateToResident"
        />
      </tbody>
    </table>
  </div>
</template>
