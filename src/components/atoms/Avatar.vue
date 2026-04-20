<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { size: 'md' }
)

const initials = computed(() => {
  // Extract from "M. DURAND Gaston (H)" → "DG" or "Mme THOMAS Madeleine (F)" → "TM"
  const cleaned = props.name
    .replace(/^(M\.|Mme)\s+/i, '')
    .replace(/\s*\([HF]\)\s*$/, '')
    .trim()
  const parts = cleaned.split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return cleaned.substring(0, 2).toUpperCase()
})

const sizeClasses = computed(() => {
  const map = {
    sm: 'h-[32px] w-[32px] text-[12px]',
    md: 'h-[40px] w-[40px] text-[14px]',
    lg: 'h-[64px] w-[64px] text-[20px]',
  }
  return map[props.size]
})
</script>

<template>
  <div
    class="flex items-center justify-center rounded-full bg-module-primary-light text-module-primary font-semibold shrink-0"
    :class="sizeClasses"
  >
    {{ initials }}
  </div>
</template>
