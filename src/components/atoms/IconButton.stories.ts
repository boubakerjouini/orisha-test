import type { Meta, StoryObj } from '@storybook/vue3'
import IconButton from './IconButton.vue'

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'Atoms/IconButton',
  tags: ['autodocs'],
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args }
    },
    template: '<IconButton v-bind="args"><span>★</span></IconButton>',
  }),
}
export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    active: false,
    ariaLabel: 'Icon button',
  },
}

export const Active: Story = {
  args: {
    active: true,
    ariaLabel: 'Active icon button',
  },
}
