<script setup lang="ts">
import { PhMagnifyingGlass } from '@phosphor-icons/vue'

defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-[64px] text-center">
    <div
      class="mb-[16px] flex h-[56px] w-[56px] items-center justify-center rounded-full bg-neutral-100"
    >
      <PhMagnifyingGlass :size="24" class="text-text-placeholder" />
    </div>
    <p class="text-[14px] font-medium text-text-secondary">
      {{ message ?? 'Aucun résident trouvé' }}
    </p>
    <p class="mt-[4px] text-[13px] text-text-tertiary">
      Essayez de modifier vos critères de recherche ou vos filtres.
    </p>
  </div>
</template>
