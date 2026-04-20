<script setup lang="ts">
import { PhCaretRight } from '@phosphor-icons/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const crumbs = computed(() => {
  const base = [
    { label: 'Résidence du centre ville', to: undefined as string | undefined },
    { label: 'Résidents', to: '/' },
  ]

  if (route.name === 'resident-detail') {
    base.push({ label: 'Synthèse', to: undefined })
  }

  return base
})

const activeIndex = computed(() => crumbs.value.length - 1)
</script>

<template>
  <div
    class="flex h-[32px] items-center gap-[4px] border-b border-stroke-primary bg-bg-default px-[12px] py-[8px]"
  >
    <template v-for="(crumb, index) in crumbs" :key="crumb.label">
      <RouterLink
        v-if="crumb.to"
        :to="crumb.to"
        class="text-[10px] font-medium leading-[14px] tracking-[-0.15px] transition-colors"
        :class="
          index === activeIndex
            ? 'text-module-primary'
            : 'text-text-secondary hover:text-module-primary'
        "
      >
        {{ crumb.label }}
      </RouterLink>
      <span
        v-else
        class="text-[10px] font-medium leading-[14px] tracking-[-0.15px]"
        :class="index === activeIndex ? 'text-module-primary' : 'text-text-secondary'"
      >
        {{ crumb.label }}
      </span>
      <PhCaretRight
        v-if="index < crumbs.length - 1"
        :size="12"
        class="text-text-placeholder"
      />
    </template>
  </div>
</template>
