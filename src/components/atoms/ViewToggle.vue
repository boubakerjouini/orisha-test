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
  <div
    class="flex items-center gap-[2px] rounded-[6px] border border-stroke-primary bg-neutral-100 p-[4px]"
  >
    <button
      class="flex h-[32px] items-center justify-center rounded-[4px] px-[12px] transition-all"
      :class="
        props.modelValue === 'list'
          ? 'bg-bg-surface text-text-primary shadow-default'
          : 'text-text-secondary hover:text-text-primary'
      "
      aria-label="Vue liste"
      @click="emit('update:modelValue', 'list')"
    >
      <PhList :size="20" />
    </button>
    <button
      class="flex h-[32px] items-center justify-center rounded-[4px] px-[12px] transition-all"
      :class="
        props.modelValue === 'grid'
          ? 'bg-bg-surface text-text-primary shadow-default'
          : 'text-text-secondary hover:text-text-primary'
      "
      aria-label="Vue trombinoscope"
      @click="emit('update:modelValue', 'grid')"
    >
      <PhSquaresFour :size="20" />
    </button>
  </div>
</template>
