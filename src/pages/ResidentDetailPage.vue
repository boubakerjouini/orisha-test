<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/organisms/AppHeader.vue'
import ResidentProfile from '@/components/organisms/ResidentProfile.vue'
import { useResident } from '@/composables/useResidents'

const route = useRoute()
const residentId = computed(() => route.params.id as string)

const { data: resident, isLoading } = useResident(() => residentId.value)

const breadcrumbs = [{ label: 'Résidents', to: '/' }]
</script>

<template>
  <div class="p-[24px]">
    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center py-[64px]">
      <div
        class="h-[32px] w-[32px] animate-spin rounded-full border-[3px] border-neutral-200 border-t-module-primary"
      />
    </div>

    <!-- Not found -->
    <div v-else-if="!resident" class="py-[64px] text-center">
      <p class="text-[14px] text-text-secondary">Résident introuvable.</p>
      <RouterLink to="/" class="mt-[8px] inline-block text-[13px] text-module-primary hover:underline">
        Retour à la liste
      </RouterLink>
    </div>

    <!-- Resident detail -->
    <template v-else>
      <AppHeader :title="resident.nomComplet" :breadcrumbs="breadcrumbs" />
      <ResidentProfile :resident="resident" />
    </template>
  </div>
</template>
