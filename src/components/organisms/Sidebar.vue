<script setup lang="ts">
import { PhHouse, PhUsers, PhCalendarBlank, PhGear, PhCaretLeft } from '@phosphor-icons/vue'
import { ref } from 'vue'

const collapsed = ref(false)

const menuItems = [
  { icon: PhHouse, label: 'Accueil', path: '/', active: false },
  { icon: PhUsers, label: 'Résidents', path: '/', active: true },
  { icon: PhCalendarBlank, label: 'Planning', path: '#', active: false },
  { icon: PhGear, label: 'Paramètres', path: '#', active: false },
]
</script>

<template>
  <aside
    class="flex h-full flex-col border-r border-stroke-secondary bg-bg-surface transition-all duration-200"
    :class="collapsed ? 'w-[64px]' : 'w-[220px]'"
  >
    <!-- Logo -->
    <div class="flex h-[56px] items-center gap-[12px] px-[16px] border-b border-stroke-secondary">
      <div
        class="flex h-[32px] w-[32px] items-center justify-center rounded-[6px] bg-module-primary text-text-invert text-[14px] font-bold shrink-0"
      >
        O
      </div>
      <Transition
        enter-active-class="transition duration-150"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <span
          v-if="!collapsed"
          class="font-heading text-[16px] font-semibold text-text-title whitespace-nowrap"
        >
          NETSoins
        </span>
      </Transition>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-[8px] px-[8px]">
      <RouterLink
        v-for="item in menuItems"
        :key="item.label"
        :to="item.path"
        class="flex items-center gap-[12px] rounded-[6px] px-[12px] py-[10px] text-[13px] font-medium transition-colors"
        :class="
          item.active
            ? 'bg-module-primary-light text-module-primary'
            : 'text-text-secondary hover:bg-neutral-100'
        "
      >
        <component :is="item.icon" :size="20" class="shrink-0" />
        <Transition
          enter-active-class="transition duration-150"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <span v-if="!collapsed" class="whitespace-nowrap">{{ item.label }}</span>
        </Transition>
      </RouterLink>
    </nav>

    <!-- Collapse toggle -->
    <div class="border-t border-stroke-secondary p-[8px]">
      <button
        class="flex h-[36px] w-full items-center justify-center rounded-[6px] text-text-tertiary transition-colors hover:bg-neutral-100"
        @click="collapsed = !collapsed"
      >
        <PhCaretLeft
          :size="16"
          class="transition-transform"
          :class="collapsed ? 'rotate-180' : ''"
        />
      </button>
    </div>
  </aside>
</template>
