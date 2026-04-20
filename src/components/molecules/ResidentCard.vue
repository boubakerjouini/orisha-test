<script setup lang="ts">
import { PhStar } from '@phosphor-icons/vue'
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
    class="flex cursor-pointer flex-col items-center rounded-[8px] border border-stroke-secondary bg-bg-surface p-[16px] shadow-sm transition-shadow hover:shadow-default"
    @click="emit('click', resident.id)"
  >
    <div class="relative mb-[12px]">
      <Avatar :name="resident.nomComplet" size="lg" />
      <PhStar
        v-if="resident.isFavorite"
        :size="14"
        weight="fill"
        class="absolute -right-[2px] -top-[2px] text-amber-400"
      />
    </div>

    <span class="text-[13px] font-medium leading-[19px] text-text-primary text-center">
      {{ resident.nomComplet }}
    </span>

    <span class="mt-[2px] text-[12px] leading-[18px] text-text-tertiary">
      Ch. {{ resident.chambre.libelleEtablissementChambre }} · {{ resident.ageTexte }}
    </span>

    <span class="mt-[2px] text-[11px] leading-[16px] text-text-placeholder">
      {{ resident.secteurSousSecteur.libelleComplet }}
    </span>

    <div class="mt-[8px]">
      <Badge
        :label="resident.situationAdministrative.texte"
        :color="resident.situationAdministrative.couleur"
      />
    </div>
  </div>
</template>
