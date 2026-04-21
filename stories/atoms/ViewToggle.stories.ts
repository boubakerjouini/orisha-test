import type { Meta, StoryObj } from '@storybook/vue3'
import ViewToggle from '@/components/atoms/ViewToggle.vue'

const meta: Meta<typeof ViewToggle> = {
  component: ViewToggle,
  title: 'Atoms/ViewToggle',
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'select',
      options: ['list', 'grid'],
    },
  },
}
export default meta
type Story = StoryObj<typeof ViewToggle>

export const ListView: Story = {
  args: {
    modelValue: 'list',
  },
}

export const GridView: Story = {
  args: {
    modelValue: 'grid',
  },
}
