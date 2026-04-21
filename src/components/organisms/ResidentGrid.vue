<script setup lang="ts">
import ResidentCard from '@/components/molecules/ResidentCard.vue'
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
  <div class="grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
    <ResidentCard
      v-for="resident in residents"
      :key="resident.id"
      :resident="resident"
      @click="navigateToResident"
    />
  </div>
</template>
