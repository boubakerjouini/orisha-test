<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    id?: string
    size?: 'sm' | 'md' | 'lg'
    shape?: 'circle' | 'rounded'
  }>(),
  { size: 'md', shape: 'circle' }
)

const initials = computed(() => {
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

const avatarSrc = computed(() => {
  if (!props.id) return null
  const isFemale = props.name.includes('(F)')
  const dir = isFemale ? 'Female' : 'Male'
  const index = (parseInt(props.id) % 5) + 1
  return `/Avatar/${dir}/${index}.png`
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
  <img
    v-if="avatarSrc"
    :src="avatarSrc"
    :alt="name"
    class="object-cover shrink-0"
    :class="[sizeClasses, shape === 'circle' ? 'rounded-full' : 'rounded-[6px]']"
  />
  <div
    v-else
    class="flex items-center justify-center bg-module-primary-light text-module-primary font-semibold shrink-0"
    :class="[sizeClasses, shape === 'circle' ? 'rounded-full' : 'rounded-[6px]']"
  >
    {{ initials }}
  </div>
</template>
