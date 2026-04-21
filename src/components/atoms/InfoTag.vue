<script setup lang="ts">
defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    class="flex h-[20px] items-center overflow-clip rounded-[4px] bg-neutral-200 px-[4px] py-[6px]"
    :class="$props.class"
  >
    <slot />
  </div>
</template>
