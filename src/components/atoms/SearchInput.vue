<script setup lang="ts">
import { PhMagnifyingGlass } from '@phosphor-icons/vue'

const model = defineModel<string>({ default: '' })
</script>

<template>
  <div class="relative">
    <PhMagnifyingGlass
      class="absolute left-[12px] top-1/2 -translate-y-1/2 text-text-placeholder"
      :size="16"
    />
    <input
      v-model="model"
      type="text"
      placeholder="Rechercher un résident..."
      class="h-[36px] w-full rounded-[6px] border border-stroke-primary bg-bg-surface pl-[36px] pr-[12px] text-[13px] leading-[19px] text-text-primary placeholder:text-text-placeholder outline-none transition-colors focus:border-module-primary focus:ring-1 focus:ring-module-primary"
    />
  </div>
</template>
