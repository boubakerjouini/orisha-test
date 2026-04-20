<script setup lang="ts">
import { PhCaretRight } from '@phosphor-icons/vue'
import Avatar from '@/components/atoms/Avatar.vue'
import Badge from '@/components/atoms/Badge.vue'
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
    class="group flex w-full cursor-pointer items-start bg-bg-surface transition-colors hover:bg-neutral-50"
    @click="emit('click', resident.id)"
  >
    <!-- Résident -->
    <div
      class="flex min-h-[56px] flex-1 items-center gap-[8px] border-b border-stroke-primary px-[16px] py-[8px]"
    >
      <Avatar :name="resident.nomComplet" size="sm" />
      <div class="min-w-0">
        <p class="truncate text-[13px] font-medium leading-[19px] tracking-[-0.15px] text-text-primary">
          {{ resident.nomComplet }}
        </p>
        <p class="truncate text-[12px] leading-[18px] tracking-[-0.15px] text-text-tertiary">
          {{ resident.nomNaissance }}
        </p>
      </div>
    </div>

    <!-- Date de naissance -->
    <div
      class="flex min-h-[56px] w-[132px] items-center border-b border-stroke-primary px-[16px] py-[8px]"
    >
      <span class="text-[13px] leading-[19px] tracking-[-0.15px] text-text-primary">
        {{ resident.dateNaissance }}
      </span>
    </div>

    <!-- INS -->
    <div
      class="flex min-h-[56px] w-[130px] items-center border-b border-stroke-primary px-[16px] py-[8px]"
    >
      <span class="text-[13px] leading-[19px] tracking-[-0.15px] text-text-primary">
        {{ resident.ins }}
      </span>
    </div>

    <!-- Secteur -->
    <div
      class="flex min-h-[56px] w-[220px] items-center border-b border-stroke-primary px-[16px] py-[8px]"
    >
      <span class="text-[13px] leading-[19px] tracking-[-0.15px] text-text-primary">
        {{ resident.secteurSousSecteur.libelleComplet }}
      </span>
    </div>

    <!-- Chambre -->
    <div
      class="flex min-h-[56px] w-[88px] items-center border-b border-stroke-primary px-[16px] py-[8px]"
    >
      <span class="text-[13px] leading-[19px] tracking-[-0.15px] text-text-primary">
        {{ resident.chambre.libelleEtablissementChambre }}
      </span>
    </div>

    <!-- Situation administrative -->
    <div
      class="flex min-h-[56px] w-[177px] items-center border-b border-stroke-primary px-[16px] py-[8px]"
    >
      <Badge
        :label="resident.situationAdministrative.texte"
        :color="resident.situationAdministrative.couleur"
      />
    </div>

    <!-- Actions -->
    <div
      class="flex min-h-[56px] w-[52px] items-center border-b border-stroke-primary py-[8px] pl-0 pr-[12px]"
    >
      <button
        class="flex h-[40px] w-[40px] items-center justify-center rounded-[6px] border border-stroke-primary bg-bg-surface shadow-sm transition-colors group-hover:bg-neutral-50"
        @click.stop
      >
        <PhCaretRight :size="20" class="text-text-secondary" />
      </button>
    </div>
  </div>
</template>
