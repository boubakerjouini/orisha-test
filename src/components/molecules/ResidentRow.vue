<script setup lang="ts">
import { PhCaretRight, PhStar } from '@phosphor-icons/vue'
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
  <tr
    class="group cursor-pointer border-b border-stroke-secondary transition-colors hover:bg-neutral-50"
    @click="emit('click', resident.id)"
  >
    <!-- Nom -->
    <td class="py-[10px] pl-[16px] pr-[12px]">
      <div class="flex items-center gap-[12px]">
        <Avatar :name="resident.nomComplet" size="sm" />
        <div class="min-w-0">
          <div class="flex items-center gap-[6px]">
            <span class="text-[13px] font-medium leading-[19px] text-text-primary truncate">
              {{ resident.nomComplet }}
            </span>
            <PhStar
              v-if="resident.isFavorite"
              :size="14"
              weight="fill"
              class="shrink-0 text-amber-400"
            />
          </div>
          <span class="text-[12px] leading-[18px] text-text-tertiary">
            {{ resident.nomNaissance }}
          </span>
        </div>
      </div>
    </td>

    <!-- Âge -->
    <td class="py-[10px] px-[12px] text-[13px] leading-[19px] text-text-secondary">
      {{ resident.ageTexte }}
    </td>

    <!-- Date de naissance -->
    <td class="py-[10px] px-[12px] text-[13px] leading-[19px] text-text-secondary">
      {{ resident.dateNaissance }}
    </td>

    <!-- INS -->
    <td class="py-[10px] px-[12px] text-[13px] leading-[19px] text-text-secondary font-mono">
      {{ resident.ins }}
    </td>

    <!-- Secteur -->
    <td class="py-[10px] px-[12px] text-[13px] leading-[19px] text-text-secondary">
      {{ resident.secteurSousSecteur.libelleComplet }}
    </td>

    <!-- Chambre -->
    <td class="py-[10px] px-[12px] text-[13px] leading-[19px] text-text-secondary text-center">
      {{ resident.chambre.libelleEtablissementChambre }}
    </td>

    <!-- Statut -->
    <td class="py-[10px] px-[12px]">
      <Badge
        :label="resident.situationAdministrative.texte"
        :color="resident.situationAdministrative.couleur"
      />
    </td>

    <!-- Arrow -->
    <td class="py-[10px] pr-[16px] pl-[4px]">
      <PhCaretRight
        :size="16"
        class="text-text-placeholder transition-colors group-hover:text-text-secondary"
      />
    </td>
  </tr>
</template>
