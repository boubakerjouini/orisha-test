import type { Meta, StoryObj } from '@storybook/vue3'
import ResidentCard from '@/components/molecules/ResidentCard.vue'
import { createMockResident } from '@/__mocks__/residents'

const meta = {
  title: 'Molecules/ResidentCard',
  component: ResidentCard,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div style="width: 220px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof ResidentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    resident: createMockResident(),
  },
}

export const Favorite: Story = {
  args: {
    resident: createMockResident({ isFavorite: true }),
  },
}
