<script setup lang="ts">
import Avatar from '@/components/atoms/Avatar.vue'
import type { Resident } from '@/types/resident'

defineProps<{
  resident: Resident
}>()

const emit = defineEmits<{
  click: [id: string]
}>()
</script>

<template>
  <div
    class="flex cursor-pointer gap-[8px] rounded-[6px] border border-stroke-secondary bg-bg-surface p-[12px] shadow-sm transition-shadow hover:shadow-default"
    @click="emit('click', resident.id)"
  >
    <Avatar :name="resident.nomComplet" :id="resident.id" size="md" />

    <div class="flex min-w-0 flex-1 flex-col">
      <p class="text-[13px] font-medium leading-[19px] tracking-[-0.15px] text-text-primary">
        {{ resident.nomComplet }}
      </p>
      <p
        v-if="resident.nomNaissance"
        class="truncate text-[12px] leading-[18px] tracking-[-0.15px] text-text-tertiary"
      >
        {{ resident.nomNaissance }}
      </p>
      <p class="text-[12px] leading-[18px] tracking-[-0.15px] text-text-tertiary">
        {{ resident.dateNaissance }} ({{ resident.ageTexte }})
      </p>
      <p class="text-[12px] leading-[18px] tracking-[-0.15px] text-text-tertiary">
        INS {{ resident.ins }}
      </p>
      <div class="flex">
        <span
          class="inline-flex min-h-[20px] min-w-[24px] items-center justify-center rounded-full border border-stroke-primary bg-bg-surface px-[6px] text-[10px] font-medium leading-[14px] tracking-[-0.15px] text-text-secondary"
        >
          {{ resident.chambre.libelleEtablissementChambre }}
        </span>
      </div>
    </div>
  </div>
</template>
