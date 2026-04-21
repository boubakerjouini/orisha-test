import type { Meta, StoryObj } from '@storybook/vue3'
import ResidentTable from '@/components/organisms/ResidentTable.vue'
import { mockResidents } from '@/__mocks__/residents'

const meta = {
  title: 'Organisms/ResidentTable',
  component: ResidentTable,
  tags: ['autodocs'],
} satisfies Meta<typeof ResidentTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    residents: mockResidents,
    allResidents: mockResidents,
  },
}
