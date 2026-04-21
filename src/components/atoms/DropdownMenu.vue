<script setup lang="ts">
import { ref, nextTick } from 'vue'

defineProps<{
  items: string[]
  minWidth?: string
}>()

defineEmits<{
  select: [item: string]
}>()

const open = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const dropdownStyle = ref<Record<string, string>>({})

function updatePosition() {
  if (!triggerRef.value) return
  const rect = triggerRef.value.getBoundingClientRect()
  const left = Math.max(8, Math.min(rect.left, window.innerWidth - 160))
  dropdownStyle.value = {
    position: 'fixed',
    top: `${rect.bottom}px`,
    left: `${left}px`,
  }
}

function toggle() {
  open.value = !open.value
  if (open.value) nextTick(updatePosition)
}

function close() {
  open.value = false
}

defineExpose({ toggle, close })
</script>

<template>
  <div class="relative">
    <div ref="triggerRef" @click="toggle">
      <slot name="trigger" :open="open" />
    </div>

    <Teleport to="body">
      <template v-if="open">
        <div class="fixed inset-0 z-[100]" @click="close" />
        <div
          class="z-[101] flex flex-col rounded-[6px] border border-stroke-primary bg-bg-surface p-[4px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.05)]"
          :style="{ ...dropdownStyle, minWidth: minWidth ?? undefined }"
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
      </template>
    </Teleport>
  </div>
</template>
