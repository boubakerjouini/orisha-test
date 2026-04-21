import type { Meta, StoryObj } from '@storybook/vue3'
import Badge from '@/components/atoms/Badge.vue'

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Atoms/Badge',
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Badge>

export const Present: Story = {
  args: {
    label: 'Présent',
    color: '#00C851',
  },
}

export const SortieTemporaire: Story = {
  args: {
    label: 'Sortie temporaire',
    color: '#FFA100',
  },
}

export const AbsenceFamiliale: Story = {
  args: {
    label: 'Absence familiale',
    color: '#33B5E5',
  },
}

export const Hospitalisation: Story = {
  args: {
    label: 'Hospitalisation',
    color: '#FF4444',
  },
}
