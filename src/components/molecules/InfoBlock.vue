<script setup lang="ts">
defineProps<{
  label: string
  value: string
}>()
</script>

<template>
  <div class="flex flex-col gap-[2px]">
    <span class="text-[10px] font-semibold uppercase tracking-[2px] text-text-tertiary">
      {{ label }}
    </span>
    <span class="text-[13px] leading-[19px] text-text-primary">
      {{ value }}
    </span>
  </div>
</template>
