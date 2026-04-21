<script setup lang="ts">
import { PhArrowCounterClockwise } from '@phosphor-icons/vue'

const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center gap-[8px] py-[80px]">
    <p class="text-[13px] font-normal leading-[19px] tracking-[-0.15px] text-text-secondary">
      Aucun résident ne correspond à votre recherche
    </p>
    <button
      class="flex min-h-[20px] cursor-pointer items-center justify-center gap-[4px]"
      @click="emit('reset')"
    >
      <PhArrowCounterClockwise :size="20" class="text-module-primary" />
      <span class="text-[13px] font-semibold leading-[19px] tracking-[-0.15px] text-module-primary">
        Réinitialiser la recherche
      </span>
    </button>
  </div>
</template>
