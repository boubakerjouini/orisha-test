import type { Meta, StoryObj } from '@storybook/vue3'
import ResidentRow from '@/components/molecules/ResidentRow.vue'
import { createMockResident } from '@/__mocks__/residents'

const meta = {
  title: 'Molecules/ResidentRow',
  component: ResidentRow,
  tags: ['autodocs'],
} satisfies Meta<typeof ResidentRow>

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
