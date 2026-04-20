<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ResidentProfile from '@/components/organisms/ResidentProfile.vue'
import { useResident } from '@/composables/useResidents'

const route = useRoute()
const residentId = computed(() => route.params.id as string)

const { data: resident, isLoading } = useResident(() => residentId.value)
</script>

<template>
  <div class="flex h-full flex-col overflow-hidden">
    <!-- Loading -->
    <div v-if="isLoading" class="flex flex-1 items-center justify-center">
      <div
        class="h-[32px] w-[32px] animate-spin rounded-full border-[3px] border-neutral-200 border-t-module-primary"
      />
    </div>

    <!-- Not found -->
    <div v-else-if="!resident" class="flex flex-1 flex-col items-center justify-center gap-[8px]">
      <p class="text-[14px] text-text-secondary">Résident introuvable.</p>
      <RouterLink to="/" class="text-[13px] text-module-primary hover:underline">
        Retour à la liste
      </RouterLink>
    </div>

    <!-- Resident detail -->
    <template v-else>
      <ResidentProfile :resident="resident" />
    </template>
  </div>
</template>
