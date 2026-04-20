<script setup lang="ts">
import { PhMagnifyingGlass } from '@phosphor-icons/vue'

const model = defineModel<string>({ default: '' })
</script>

<template>
  <div class="relative w-[377px]">
    <PhMagnifyingGlass
      class="absolute left-[8px] top-1/2 -translate-y-1/2 text-text-placeholder"
      :size="20"
    />
    <input
      v-model="model"
      type="text"
      placeholder="Rechercher un résident ou un INS"
      class="h-[40px] min-h-[40px] w-full rounded-[6px] border border-stroke-primary bg-bg-surface pl-[36px] pr-[8px] text-[13px] leading-[19px] tracking-[-0.15px] text-text-primary placeholder:text-text-placeholder outline-none transition-colors focus:border-module-primary focus:ring-1 focus:ring-module-primary"
    />
  </div>
</template>
