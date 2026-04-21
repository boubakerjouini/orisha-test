import type { Meta, StoryObj } from '@storybook/vue3'
import ResidentGrid from './ResidentGrid.vue'
import { createMockResident, mockResidents } from '@/__mocks__/residents'

const meta = {
  title: 'Organisms/ResidentGrid',
  component: ResidentGrid,
  tags: ['autodocs'],
} satisfies Meta<typeof ResidentGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    residents: mockResidents,
  },
}

export const SingleResident: Story = {
  args: {
    residents: [createMockResident()],
  },
}
