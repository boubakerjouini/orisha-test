<script setup lang="ts">
import { PhGenderMale, PhGenderFemale, PhCaretDown } from '@phosphor-icons/vue'
import Avatar from '@/components/atoms/Avatar.vue'
import InfoTag from '@/components/atoms/InfoTag.vue'
import Tooltip from '@/components/atoms/Tooltip.vue'
import DropdownMenu from '@/components/atoms/DropdownMenu.vue'
import type { Resident } from '@/types/resident'
import { computed, ref, nextTick, onMounted } from 'vue'

const props = defineProps<{
  resident: Resident
}>()

const displayName = computed(() =>
  props.resident.nomComplet.replace(/\s*\([HF]\)\s*$/, '')
)

const isMale = computed(() => props.resident.nomComplet.includes('(H)'))

const activeTab = ref('Synthèse')
const tabsContainerRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref({ left: '0px', width: '0px' })

const tabs = [
  { label: 'Synthèse' },
  { label: 'Soins', dropdownItems: ['Traitements', 'Prescriptions', 'Relevés', 'Pharmacie'] },
  { label: 'Administratif' },
  { label: 'Alimentation' },
  { label: 'Intendance' },
  { label: 'Autres', dropdownItems: ['Réunions', 'Événements indésirables'] },
]

function updateIndicator() {
  if (!tabsContainerRef.value) return
  const activeEl = tabsContainerRef.value.querySelector(`[data-tab="${activeTab.value}"]`) as HTMLElement | null
  if (!activeEl) return
  indicatorStyle.value = {
    left: `${activeEl.offsetLeft}px`,
    width: `${activeEl.offsetWidth}px`,
  }
}

function selectTab(label: string) {
  activeTab.value = label
  nextTick(updateIndicator)
}

onMounted(updateIndicator)
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- Header patient -->
    <div class="isolate flex flex-col shadow-sm">
      <!-- Bandeau patient -->
      <div
        class="z-[2] flex w-full flex-col gap-[12px] border-b border-stroke-primary bg-bg-surface p-[12px] sm:flex-row sm:items-center"
      >
        <Avatar :name="resident.nomComplet" :id="resident.id" size="lg" shape="rounded" />

        <div class="flex min-w-0 flex-1 flex-col gap-[8px]">
          <p class="text-[14px] font-semibold leading-[20px] tracking-[-0.14px] text-text-primary">
            {{ displayName }}
          </p>

          <div class="scrollbar-hide flex w-full items-start gap-[4px] overflow-x-auto pb-[2px] md:flex-wrap">
            <!-- GIR -->
            <InfoTag v-if="resident.gir">
              <span class="text-[10px] font-semibold leading-[14px] tracking-[-0.15px] text-text-primary">
                GIR {{ resident.gir }}
              </span>
            </InfoTag>

            <!-- État civil -->
            <InfoTag class="gap-[4px]">
              <component
                :is="isMale ? PhGenderMale : PhGenderFemale"
                :size="16"
                class="text-text-primary"
              />
              <span class="text-[10px] font-semibold leading-[14px] tracking-[-0.15px] text-text-primary">
                {{ resident.ageTexte }}
              </span>
              <span class="text-[9px] font-semibold leading-[14px] tracking-[-0.15px] text-text-secondary">
                ({{ resident.dateNaissance }})
              </span>
            </InfoTag>

            <!-- Chambre -->
            <InfoTag>
              <span class="text-[10px] font-semibold leading-[14px] tracking-[-0.15px] text-text-primary">
                CH. {{ resident.chambre.libelleEtablissementChambre }}
              </span>
            </InfoTag>

            <!-- Médecin traitant -->
            <Tooltip v-if="resident.medecinTraitant" min-width="104px">
              <template #trigger>
                <InfoTag class="cursor-default gap-[8px]">
                  <span class="font-heading text-[8px] font-semibold uppercase text-text-secondary">
                    Médecin traitant
                  </span>
                  <span class="text-[10px] font-semibold leading-[14px] tracking-[-0.15px] text-text-primary">
                    {{ resident.medecinTraitant.nom }} {{ resident.medecinTraitant.prenom.charAt(0) }}.
                  </span>
                </InfoTag>
              </template>

              <span class="text-[11px] font-semibold leading-[16px] tracking-[-0.15px] text-white">
                Médecin traitant
              </span>
              <div class="flex flex-col gap-[4px] text-[11px] font-normal leading-[16px] tracking-[-0.15px] text-white/80">
                <p>{{ resident.medecinTraitant.nom }} {{ resident.medecinTraitant.prenom }}</p>
                <p>{{ resident.medecinTraitant.telephone }}</p>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      <!-- Nav tabs -->
      <div
        class="scrollbar-hide z-[1] flex h-[48px] items-center overflow-x-auto border-b border-stroke-primary bg-bg-surface px-[8px]"
      >
        <div ref="tabsContainerRef" class="relative flex items-center">
          <template v-for="tab in tabs" :key="tab.label">
            <!-- Tab with dropdown -->
            <DropdownMenu
              v-if="tab.dropdownItems"
              :items="tab.dropdownItems"
              :data-tab="tab.label"
              min-width="142px"
            >
              <template #trigger>
                <div
                  class="flex min-h-[48px] cursor-pointer items-center justify-center gap-[8px] px-[12px] py-[14px]"
                  @click="selectTab(tab.label)"
                >
                  <span
                    class="text-[13px] font-medium leading-[19px] tracking-[-0.15px] whitespace-nowrap transition-colors duration-200"
                    :class="activeTab === tab.label ? 'text-module-primary' : 'text-text-secondary'"
                  >
                    {{ tab.label }}
                  </span>
                  <PhCaretDown
                    :size="20"
                    class="transition-colors duration-200"
                    :class="activeTab === tab.label ? 'text-module-primary' : 'text-text-secondary'"
                  />
                </div>
              </template>
            </DropdownMenu>

            <!-- Simple tab -->
            <div
              v-else
              :data-tab="tab.label"
              class="flex min-h-[48px] cursor-pointer items-center justify-center gap-[8px] px-[12px] py-[14px]"
              @click="selectTab(tab.label)"
            >
              <span
                class="text-[13px] font-medium leading-[19px] tracking-[-0.15px] whitespace-nowrap transition-colors duration-200"
                :class="activeTab === tab.label ? 'text-module-primary' : 'text-text-secondary'"
              >
                {{ tab.label }}
              </span>
            </div>
          </template>

          <!-- Sliding indicator -->
          <div
            class="absolute bottom-0 h-[2px] bg-module-primary transition-all duration-300 ease-in-out"
            :style="indicatorStyle"
          />
        </div>
      </div>
    </div>

    <!-- Content wrapper (empty for now) -->
    <div class="min-h-px flex-1" />
  </div>
</template>
