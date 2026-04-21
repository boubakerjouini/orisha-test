<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  items: string[]
  minWidth?: string
}>()

defineEmits<{
  select: [item: string]
}>()

const open = ref(false)

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

defineExpose({ toggle, close })
</script>

<template>
  <div class="relative">
    <div @click="toggle">
      <slot name="trigger" :open="open" />
    </div>

    <div v-if="open" class="fixed inset-0 z-10" @click="close" />

    <div
      v-if="open"
      class="absolute left-0 top-full z-20 flex flex-col rounded-[6px] border border-stroke-primary bg-bg-surface p-[4px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.05)]"
      :style="minWidth ? { minWidth } : undefined"
    >
      <div
        v-for="item in items"
        :key="item"
        class="flex min-h-[40px] cursor-pointer items-center rounded-[6px] px-[8px] py-[6px] transition-colors hover:bg-neutral-50"
        @click="$emit('select', item); close()"
      >
        <span class="text-[13px] font-normal leading-[19px] tracking-[-0.15px] text-text-primary whitespace-nowrap">
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>
