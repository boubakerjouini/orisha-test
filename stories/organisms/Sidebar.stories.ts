import type { Meta, StoryObj } from '@storybook/vue3'
import Sidebar from '@/components/organisms/Sidebar.vue'

const meta = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    () => ({
      template: '<div style="height: 100vh;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
