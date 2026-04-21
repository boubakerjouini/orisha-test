import type { Meta, StoryObj } from '@storybook/vue3'
import Avatar from '@/components/atoms/Avatar.vue'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Atoms/Avatar',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    name: 'M. Jean Dupont',
    id: '1',
    size: 'md',
  },
}

export const Female: Story = {
  args: {
    name: 'Mme Marie Martin (F)',
    id: '2',
    size: 'md',
  },
}

export const Small: Story = {
  args: {
    name: 'M. Pierre Durand',
    id: '3',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    name: 'Mme Sophie Bernard (F)',
    id: '4',
    size: 'lg',
  },
}

export const InitialsOnly: Story = {
  args: {
    name: 'M. Luc Moreau',
    size: 'md',
  },
}
