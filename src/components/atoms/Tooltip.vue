<script setup lang="ts">
defineProps<{
  minWidth?: string
}>()
</script>

<template>
  <div class="group/tooltip relative">
    <slot name="trigger" />

    <div
      class="pointer-events-none absolute left-1/2 top-full z-10 flex -translate-x-1/2 flex-col items-center opacity-0 transition-opacity group-hover/tooltip:pointer-events-auto group-hover/tooltip:opacity-100"
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
  </div>
</template>
