<script setup lang="ts">
import { PhCaretRight } from '@phosphor-icons/vue'

defineProps<{
  title: string
  breadcrumbs?: { label: string; to?: string }[]
}>()
</script>

<template>
  <header class="flex items-center gap-[8px] py-[16px]">
    <template v-if="breadcrumbs?.length">
      <template v-for="(crumb, index) in breadcrumbs" :key="crumb.label">
        <RouterLink
          v-if="crumb.to"
          :to="crumb.to"
          class="text-[13px] text-text-tertiary hover:text-module-primary transition-colors"
        >
          {{ crumb.label }}
        </RouterLink>
        <span v-else class="text-[13px] text-text-tertiary">{{ crumb.label }}</span>
        <PhCaretRight
          v-if="index < breadcrumbs.length - 1"
          :size="12"
          class="text-text-placeholder"
        />
      </template>
      <PhCaretRight :size="12" class="text-text-placeholder" />
    </template>
    <h1 class="font-heading text-[20px] font-medium leading-[26px] text-text-title">
      {{ title }}
    </h1>
  </header>
</template>
