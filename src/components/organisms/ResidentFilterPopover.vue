<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'
import { onClickOutside } from '@/composables/useClickOutside'
import type { Resident } from '@/types/resident'

const props = defineProps<{
  residents: Resident[]
  triggerRef: HTMLElement | null
}>()

const emit = defineEmits<{
  filter: [ids: Set<string> | null]
  close: []
}>()

const popoverRef = ref<HTMLElement | null>(null)
const search = ref('')
const selectedIds = ref<Set<string>>(new Set())

onClickOutside(popoverRef, () => {
  emit('close')
})

const popoverStyle = ref<{ top: string; left: string }>({ top: '0px', left: '0px' })

function updatePosition() {
  if (!props.triggerRef) return
  const rect = props.triggerRef.getBoundingClientRect()
  const popoverWidth = Math.min(360, window.innerWidth - 16)
  const left = Math.max(8, Math.min(rect.left, window.innerWidth - popoverWidth - 8))
  popoverStyle.value = {
    top: `${rect.bottom + 4}px`,
    left: `${left}px`,
  }
}

onMounted(() => {
  updatePosition()
  window.addEventListener('scroll', updatePosition, true)
  window.addEventListener('resize', updatePosition)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
})

const filteredResidents = computed(() => {
  if (!search.value) return props.residents
  const q = search.value.toLowerCase()
  return props.residents.filter((r) => r.nomComplet.toLowerCase().includes(q))
})

const allChecked = computed(() => {
  return filteredResidents.value.length > 0 &&
    filteredResidents.value.every((r) => selectedIds.value.has(r.id))
})

function toggleAll() {
  if (allChecked.value) {
    // Uncheck all visible
    for (const r of filteredResidents.value) {
      selectedIds.value.delete(r.id)
    }
  } else {
    // Check all visible
    for (const r of filteredResidents.value) {
      selectedIds.value.add(r.id)
    }
  }
}

function toggleResident(id: string) {
  if (selectedIds.value.has(id)) {
    selectedIds.value.delete(id)
  } else {
    selectedIds.value.add(id)
  }
}

function apply() {
  if (selectedIds.value.size === 0) {
    emit('filter', null)
  } else {
    emit('filter', new Set(selectedIds.value))
  }
  emit('close')
}

function cancel() {
  emit('close')
}
</script>

<template>
  <div
    ref="popoverRef"
    class="fixed z-50 flex w-[calc(100vw-16px)] max-w-[360px] flex-col rounded-[8px] border border-stroke-primary bg-bg-surface shadow-default"
    :style="{ top: popoverStyle.top, left: popoverStyle.left }"
  >
    <!-- Search input -->
    <div class="p-[12px] pb-[8px]">
      <div class="relative">
        <PhMagnifyingGlass
          class="absolute left-[8px] top-1/2 -translate-y-1/2 text-text-placeholder"
          :size="20"
        />
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher un résident"
          class="h-[40px] w-full rounded-[6px] border border-stroke-primary bg-bg-surface pl-[36px] pr-[8px] text-[13px] leading-[19px] tracking-[-0.15px] text-text-primary placeholder:text-text-placeholder outline-none focus:border-module-primary"
        />
      </div>
    </div>

    <!-- Tout cocher -->
    <button
      class="px-[12px] pb-[8px] text-left text-[13px] font-semibold tracking-[-0.15px] text-module-primary hover:underline"
      @click="toggleAll"
    >
      {{ allChecked ? 'Tout décocher' : 'Tout cocher' }}
    </button>

    <!-- Residents list -->
    <div class="max-h-[200px] overflow-y-auto">
      <label
        v-for="resident in filteredResidents"
        :key="resident.id"
        class="flex h-[40px] cursor-pointer items-center gap-[12px] px-[12px] transition-colors hover:bg-neutral-50"
      >
        <input
          type="checkbox"
          :checked="selectedIds.has(resident.id)"
          class="h-[18px] w-[18px] shrink-0 cursor-pointer rounded-[4px] border-[1.5px] border-stroke-primary accent-module-primary"
          @change="toggleResident(resident.id)"
        />
        <span class="text-[13px] leading-[19px] tracking-[-0.15px] text-text-primary truncate">
          {{ resident.nomComplet }}
        </span>
      </label>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between border-t border-stroke-secondary px-[8px] py-[8px]">
      <button
        class="flex h-[32px] items-center rounded-full bg-neutral-100 px-[12px] text-[13px] font-semibold tracking-[-0.15px] text-text-primary transition-colors hover:bg-neutral-200"
        @click="cancel"
      >
        Annuler
      </button>
      <button
        class="flex h-[32px] items-center rounded-full bg-module-primary px-[16px] text-[13px] font-semibold tracking-[-0.15px] text-text-invert transition-opacity hover:opacity-90"
        @click="apply"
      >
        Filtrer
      </button>
    </div>
  </div>
</template>
