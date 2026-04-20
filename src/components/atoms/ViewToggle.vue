<script setup lang="ts">
import { PhList, PhSquaresFour } from '@phosphor-icons/vue'
import type { ViewMode } from '@/types/resident'

const props = defineProps<{
  modelValue: ViewMode
}>()

const emit = defineEmits<{
  'update:modelValue': [mode: ViewMode]
}>()
</script>

<template>
  <div class="flex items-center rounded-[6px] border border-stroke-primary bg-bg-surface">
    <button
      class="flex h-[34px] w-[36px] items-center justify-center rounded-l-[5px] transition-colors"
      :class="
        props.modelValue === 'list'
          ? 'bg-module-primary text-text-invert'
          : 'text-text-secondary hover:bg-neutral-100'
      "
      aria-label="Vue liste"
      @click="emit('update:modelValue', 'list')"
    >
      <PhList :size="16" weight="bold" />
    </button>
    <button
      class="flex h-[34px] w-[36px] items-center justify-center rounded-r-[5px] transition-colors"
      :class="
        props.modelValue === 'grid'
          ? 'bg-module-primary text-text-invert'
          : 'text-text-secondary hover:bg-neutral-100'
      "
      aria-label="Vue trombinoscope"
      @click="emit('update:modelValue', 'grid')"
    >
      <PhSquaresFour :size="16" weight="bold" />
    </button>
  </div>
</template>
