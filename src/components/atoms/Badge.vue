<script setup lang="ts">
import { computed } from 'vue'
import { STATUS_COLOR_MAP, type StatusColor } from '@/types/resident'

const props = defineProps<{
  label: string
  color: string // hex color from data.json
}>()

const statusKey = computed<StatusColor>(() => {
  return STATUS_COLOR_MAP[props.color] ?? 'green'
})

const classes = computed(() => {
  const map: Record<StatusColor, string> = {
    green: 'bg-status-green-bg border-status-green-border text-status-green-text',
    orange: 'bg-status-orange-bg border-status-orange-border text-status-orange-text',
    blue: 'bg-status-blue-bg border-status-blue-border text-status-blue-text',
    red: 'bg-status-red-bg border-status-red-border text-status-red-text',
  }
  return map[statusKey.value]
})
</script>

<template>
  <span
    class="inline-flex items-center gap-[4px] rounded-full border px-[8px] py-[2px] text-[10px] font-medium leading-[14px]"
    :class="classes"
  >
    <span
      class="h-[6px] w-[6px] rounded-full"
      :style="{ backgroundColor: props.color }"
    />
    {{ label }}
  </span>
</template>
