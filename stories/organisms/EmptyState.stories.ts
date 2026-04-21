import type { Meta, StoryObj } from '@storybook/vue3'
import EmptyState from '@/components/organisms/EmptyState.vue'

const meta = {
  title: 'Organisms/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomMessage: Story = {
  args: {
    message: 'Aucun résultat pour cette recherche',
  },
}
