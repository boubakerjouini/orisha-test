<script setup lang="ts">
import { PhList, PhPlus } from '@phosphor-icons/vue'
import { useFilterStore } from '@/stores/filters'

defineProps<{
  title: string
  subtitle?: string
}>()

const filterStore = useFilterStore()
</script>

<template>
  <div class="flex items-start justify-between">
    <div class="flex items-center gap-[12px]">
      <!-- Burger menu (mobile only) -->
      <button
        aria-label="Ouvrir le menu"
        class="flex h-[40px] w-[40px] items-center justify-center rounded-[6px] border border-stroke-primary bg-bg-surface transition-colors hover:bg-neutral-50 md:hidden"
        @click="filterStore.toggleMobileSidebar()"
      >
        <PhList :size="20" class="text-text-secondary" />
      </button>

      <div class="flex flex-col gap-[4px]">
        <h1 class="font-heading text-[20px] font-medium leading-[26px] text-text-title">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="text-[13px] leading-[19px] tracking-[-0.15px] text-text-secondary">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <!-- Bouton + (mobile only) -->
    <button
      aria-label="Nouveau résident"
      class="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-module-primary text-text-invert transition-opacity hover:opacity-90 md:hidden"
    >
      <PhPlus :size="20" />
    </button>
  </div>
</template>
