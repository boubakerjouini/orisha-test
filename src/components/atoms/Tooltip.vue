<script setup lang="ts">
import { ref, nextTick } from 'vue'

const props = defineProps<{
  minWidth?: string
}>()

const showClick = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const tooltipStyle = ref<Record<string, string>>({})

function updatePosition() {
  if (!triggerRef.value) return
  const rect = triggerRef.value.getBoundingClientRect()
  const tooltipWidth = Math.max(parseInt(props.minWidth ?? '120'), 120)
  const centerX = rect.left + rect.width / 2
  const left = Math.max(8 + tooltipWidth / 2, Math.min(centerX, window.innerWidth - 8 - tooltipWidth / 2))
  tooltipStyle.value = {
    position: 'fixed',
    top: `${rect.bottom}px`,
    left: `${left}px`,
    transform: 'translateX(-50%)',
  }
}

function toggleClick() {
  showClick.value = !showClick.value
  if (showClick.value) nextTick(updatePosition)
}
</script>

<template>
  <div class="group/tooltip relative">
    <div ref="triggerRef" @click.stop="toggleClick">
      <slot name="trigger" />
    </div>

    <Teleport to="body">
      <template v-if="showClick">
        <div class="fixed inset-0 z-[100]" @click="showClick = false" />
        <div
          class="z-[101] flex flex-col items-center"
          :style="tooltipStyle"
        >
          <div class="flex h-[6px] w-[14px] items-center justify-center">
            <div class="h-0 w-0 border-[7px] border-transparent border-b-neutral-800" />
          </div>
          <div
            class="flex flex-col gap-[6px] rounded-[6px] bg-neutral-800 p-[8px]"
            :style="minWidth ? { minWidth } : undefined"
          >
            <slot />
          </div>
        </div>
      </template>
    </Teleport>
  </div>
</template>
