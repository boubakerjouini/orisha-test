import type { Meta, StoryObj } from '@storybook/vue3'
import AppHeader from '@/components/organisms/AppHeader.vue'

const meta = {
  title: 'Organisms/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof AppHeader>

export default meta
type Story = StoryObj<typeof meta>

export const WithSubtitle: Story = {
  args: {
    title: 'Résidents',
    subtitle: '120 résidents au total',
  },
}

export const WithoutSubtitle: Story = {
  args: {
    title: 'Résidents',
  },
}
