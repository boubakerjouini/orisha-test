<script setup lang="ts">
import { PhPlus } from '@phosphor-icons/vue'
import SearchInput from '@/components/atoms/SearchInput.vue'
import ViewToggle from '@/components/atoms/ViewToggle.vue'
import { useFilterStore } from '@/stores/filters'

const filterStore = useFilterStore()
</script>

<template>
  <div class="flex items-start justify-between w-full">
    <!-- Search -->
    <SearchInput v-model="filterStore.search" />

    <!-- Right actions -->
    <div class="flex items-center gap-[16px]">
      <!-- Segmented control -->
      <ViewToggle v-model="filterStore.viewMode" />

      <!-- Nouveau résident button -->
      <button
        class="flex min-h-[40px] items-center gap-[8px] rounded-full bg-module-primary px-[16px] py-[8px] text-text-invert transition-opacity hover:opacity-90"
      >
        <PhPlus :size="20" />
        <span class="text-[13px] font-semibold leading-[19px] tracking-[-0.15px]">
          Nouveau résident
        </span>
      </button>
    </div>
  </div>
</template>
