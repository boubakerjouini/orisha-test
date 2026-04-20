<script setup lang="ts">
import { PhStar, PhGenderMale, PhGenderFemale } from '@phosphor-icons/vue'
import Avatar from '@/components/atoms/Avatar.vue'
import Badge from '@/components/atoms/Badge.vue'
import InfoBlock from '@/components/molecules/InfoBlock.vue'
import type { Resident } from '@/types/resident'
import { computed } from 'vue'

const props = defineProps<{
  resident: Resident
}>()

const gender = computed(() => {
  return props.resident.nomComplet.includes('(H)') ? 'male' : 'female'
})
</script>

<template>
  <div class="rounded-[8px] border border-stroke-secondary bg-bg-surface">
    <!-- Header with avatar + name -->
    <div class="flex items-start gap-[16px] p-[24px] border-b border-stroke-secondary">
      <Avatar :name="resident.nomComplet" size="lg" />
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-[8px]">
          <h2 class="font-heading text-[20px] font-medium leading-[26px] text-text-title truncate">
            {{ resident.nomComplet }}
          </h2>
          <component
            :is="gender === 'male' ? PhGenderMale : PhGenderFemale"
            :size="18"
            class="shrink-0 text-text-tertiary"
          />
          <PhStar
            v-if="resident.isFavorite"
            :size="16"
            weight="fill"
            class="shrink-0 text-amber-400"
          />
        </div>
        <p class="mt-[2px] text-[12px] leading-[18px] text-text-tertiary">
          {{ resident.nomNaissance }}
        </p>
        <div class="mt-[8px]">
          <Badge
            :label="resident.situationAdministrative.texte"
            :color="resident.situationAdministrative.couleur"
          />
        </div>
      </div>
    </div>

    <!-- Info grid -->
    <div class="grid grid-cols-2 gap-[16px] p-[24px] lg:grid-cols-3">
      <InfoBlock label="Date de naissance" :value="resident.dateNaissance" />
      <InfoBlock label="Âge" :value="resident.ageTexte" />
      <InfoBlock label="N° INS" :value="resident.ins" />
      <InfoBlock label="Secteur" :value="resident.secteurSousSecteur.libelleComplet" />
      <InfoBlock label="Chambre" :value="resident.chambre.libelleEtablissementChambre" />
      <InfoBlock label="Situation" :value="resident.situationAdministrative.texte" />
    </div>
  </div>
</template>
