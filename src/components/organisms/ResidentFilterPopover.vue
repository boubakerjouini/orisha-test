<script setup lang="ts">
import { ref, computed } from 'vue'
import { PhMagnifyingGlass, PhX } from '@phosphor-icons/vue'
import { onClickOutside } from '@/composables/useClickOutside'
import type { Resident } from '@/types/resident'

const props = defineProps<{
  residents: Resident[]
  modelValue: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  close: []
}>()

const popoverRef = ref<HTMLElement | null>(null)
const search = ref('')
const localSelection = ref<string | null>(props.modelValue)

onClickOutside(popoverRef, () => {
  emit('close')
})

// Extract unique statuses from residents for filtering
const statusOptions = computed(() => {
  const set = new Set(props.residents.map((r) => r.situationAdministrative.texte))
  return Array.from(set).sort()
})

const filteredOptions = computed(() => {
  if (!search.value) return statusOptions.value
  const q = search.value.toLowerCase()
  return statusOptions.value.filter((s) => s.toLowerCase().includes(q))
})

function toggleOption(option: string) {
  localSelection.value = localSelection.value === option ? null : option
}

function apply() {
  emit('update:modelValue', localSelection.value)
  emit('close')
}

function reset() {
  localSelection.value = null
  emit('update:modelValue', null)
  emit('close')
}
</script>

<template>
  <div
    ref="popoverRef"
    class="absolute left-0 top-[calc(100%+4px)] z-20 flex w-[360px] flex-col rounded-[8px] border border-stroke-primary bg-bg-surface shadow-default"
  >
    <!-- Search input -->
    <div class="p-[12px] pb-0">
      <div class="relative">
        <PhMagnifyingGlass
          class="absolute left-[8px] top-1/2 -translate-y-1/2 text-text-placeholder"
          :size="20"
        />
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher..."
          class="h-[40px] w-full rounded-[6px] border border-stroke-primary bg-bg-surface pl-[36px] pr-[8px] text-[13px] leading-[19px] tracking-[-0.15px] text-text-primary placeholder:text-text-placeholder outline-none focus:border-module-primary"
        />
      </div>
    </div>

    <!-- Active filter tag -->
    <div class="px-[12px] py-[8px]">
      <button
        v-if="localSelection"
        class="inline-flex h-[32px] items-center gap-[4px] rounded-[6px] bg-module-primary-light px-[8px] text-[13px] font-medium tracking-[-0.15px] text-module-primary"
        @click="localSelection = null"
      >
        {{ localSelection }}
        <PhX :size="14" />
      </button>
      <span v-else class="text-[12px] text-text-placeholder">Aucun filtre actif</span>
    </div>

    <!-- Dropdown list -->
    <div class="max-h-[160px] overflow-y-auto">
      <button
        v-for="option in filteredOptions"
        :key="option"
        class="flex h-[40px] w-full items-center px-[16px] text-left text-[13px] leading-[19px] tracking-[-0.15px] transition-colors"
        :class="
          localSelection === option
            ? 'bg-module-primary-light text-module-primary font-medium'
            : 'text-text-primary hover:bg-neutral-50'
        "
        @click="toggleOption(option)"
      >
        {{ option }}
      </button>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between border-t border-stroke-secondary px-[8px] py-[8px]">
      <button
        class="flex h-[32px] items-center rounded-[6px] px-[12px] text-[13px] font-medium tracking-[-0.15px] text-text-secondary transition-colors hover:bg-neutral-50"
        @click="reset"
      >
        Effacer
      </button>
      <button
        class="flex h-[32px] items-center rounded-[6px] bg-module-primary px-[12px] text-[13px] font-medium tracking-[-0.15px] text-text-invert transition-opacity hover:opacity-90"
        @click="apply"
      >
        Filtrer
      </button>
    </div>
  </div>
</template>
