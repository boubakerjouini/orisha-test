<script setup lang="ts">
import { ref, computed } from 'vue'
import { PhCaretDown, PhCheck } from '@phosphor-icons/vue'
import { onClickOutside } from '@/composables/useClickOutside'

const props = defineProps<{
  label: string
  options: string[]
  modelValue: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

onClickOutside(dropdownRef, () => {
  isOpen.value = false
})

const displayLabel = computed(() => {
  return props.modelValue ?? props.label
})

function select(option: string | null) {
  emit('update:modelValue', option === props.modelValue ? null : option)
  isOpen.value = false
}
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      class="flex h-[36px] items-center gap-[6px] rounded-[6px] border px-[12px] text-[13px] leading-[19px] transition-colors"
      :class="
        modelValue
          ? 'border-module-primary bg-module-primary-light text-module-primary'
          : 'border-stroke-primary bg-bg-surface text-text-secondary hover:bg-neutral-50'
      "
      @click="isOpen = !isOpen"
    >
      {{ displayLabel }}
      <PhCaretDown
        :size="14"
        class="transition-transform"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-[-4px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-4px]"
    >
      <div
        v-if="isOpen"
        class="absolute left-0 top-[calc(100%+4px)] z-10 min-w-[180px] rounded-[8px] border border-stroke-secondary bg-bg-surface py-[4px] shadow-default"
      >
        <button
          v-for="option in options"
          :key="option"
          class="flex w-full items-center justify-between px-[12px] py-[8px] text-left text-[13px] leading-[19px] text-text-secondary transition-colors hover:bg-neutral-50"
          @click="select(option)"
        >
          {{ option }}
          <PhCheck
            v-if="modelValue === option"
            :size="14"
            class="text-module-primary"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>
