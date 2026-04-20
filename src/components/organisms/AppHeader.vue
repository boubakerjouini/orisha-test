<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="flex flex-col gap-[4px]">
    <h1 class="font-heading text-[20px] font-medium leading-[26px] text-text-title">
      {{ title }}
    </h1>
    <p v-if="subtitle" class="text-[13px] leading-[19px] tracking-[-0.15px] text-text-secondary">
      {{ subtitle }}
    </p>
  </div>
</template>
