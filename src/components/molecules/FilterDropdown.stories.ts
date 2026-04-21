import type { Meta, StoryObj } from '@storybook/vue3'
import FilterDropdown from './FilterDropdown.vue'

const meta = {
  title: 'Molecules/FilterDropdown',
  component: FilterDropdown,
  tags: ['autodocs'],
  args: {
    label: 'Secteur',
    options: ['RDC', '1er étage', '2ème étage'],
  },
} satisfies Meta<typeof FilterDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: {
    modelValue: null,
  },
}

export const WithSelection: Story = {
  args: {
    modelValue: 'RDC',
  },
}
