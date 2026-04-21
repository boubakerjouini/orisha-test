<script setup lang="ts">
import { computed } from 'vue'
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'

const props = withDefaults(
  defineProps<{
    currentPage: number
    totalPages: number
    totalItems: number
    pageSize: number
    pageSizeOptions?: number[]
  }>(),
  { pageSizeOptions: () => [5, 10, 20, 50] }
)

const emit = defineEmits<{
  'update:currentPage': [page: number]
  'update:pageSize': [size: number]
}>()

const rangeText = computed(() => {
  const start = (props.currentPage - 1) * props.pageSize + 1
  const end = Math.min(props.currentPage * props.pageSize, props.totalItems)
  return `${start}-${end} sur ${props.totalItems} résident${props.totalItems > 1 ? 's' : ''}`
})

const pages = computed(() => {
  const current = props.currentPage
  const total = props.totalPages
  const set = new Set<number>([1, total, current, current - 1, current + 1])
  const sorted = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)

  const result: Array<{ type: 'page'; value: number } | { type: 'ellipsis' }> = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push({ type: 'ellipsis' })
    }
    result.push({ type: 'page', value: sorted[i] })
  }
  return result
})
</script>

<template>
  <div class="flex flex-col items-center gap-[8px] border-t border-stroke-primary bg-bg-surface px-[16px] py-[12px] sm:flex-row sm:justify-between sm:gap-0">
    <div class="flex items-center gap-[12px]">
      <span class="text-[13px] leading-[19px] tracking-[-0.15px] text-text-tertiary">
        {{ rangeText }}
      </span>
      <select
        :value="pageSize"
        aria-label="Résidents par page"
        class="h-[32px] rounded-[6px] border border-stroke-primary bg-bg-surface px-[8px] pr-[24px] text-[13px] leading-[19px] tracking-[-0.15px] text-text-secondary outline-none cursor-pointer hover:bg-neutral-100 transition-colors"
        @change="emit('update:pageSize', Number(($event.target as HTMLSelectElement).value))"
      >
        <option v-for="opt in pageSizeOptions" :key="opt" :value="opt">
          {{ opt }} / page
        </option>
      </select>
    </div>

    <div class="flex items-center gap-[4px]">
      <button
        aria-label="Page précédente"
        class="flex h-[32px] w-[32px] items-center justify-center rounded-[6px] border border-stroke-primary bg-bg-surface text-text-secondary transition-colors"
        :class="currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-neutral-100'"
        :disabled="currentPage === 1"
        @click="emit('update:currentPage', currentPage - 1)"
      >
        <PhCaretLeft :size="16" />
      </button>

      <template v-for="(item, i) in pages" :key="i">
        <span
          v-if="item.type === 'ellipsis'"
          class="flex h-[32px] w-[32px] items-center justify-center text-[13px] text-text-placeholder"
        >
          ...
        </span>
        <button
          v-else
          class="flex h-[32px] min-w-[32px] items-center justify-center rounded-[6px] px-[8px] text-[13px] font-medium transition-colors"
          :class="
            item.value === currentPage
              ? 'bg-module-primary text-text-invert'
              : 'border border-stroke-primary bg-bg-surface text-text-secondary hover:bg-neutral-100'
          "
          @click="emit('update:currentPage', item.value)"
        >
          {{ item.value }}
        </button>
      </template>

      <button
        aria-label="Page suivante"
        class="flex h-[32px] w-[32px] items-center justify-center rounded-[6px] border border-stroke-primary bg-bg-surface text-text-secondary transition-colors"
        :class="currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-neutral-100'"
        :disabled="currentPage === totalPages"
        @click="emit('update:currentPage', currentPage + 1)"
      >
        <PhCaretRight :size="16" />
      </button>
    </div>
  </div>
</template>
