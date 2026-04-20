<script setup lang="ts">
withDefaults(
  defineProps<{
    active?: boolean
    ariaLabel?: string
  }>(),
  { active: false }
)
</script>

<template>
  <button
    :aria-label="ariaLabel"
    class="flex h-[36px] w-[36px] items-center justify-center rounded-[6px] border transition-colors"
    :class="
      active
        ? 'border-module-primary bg-module-primary text-text-invert'
        : 'border-stroke-primary bg-bg-surface text-text-secondary hover:bg-neutral-100'
    "
  >
    <slot />
  </button>
</template>
