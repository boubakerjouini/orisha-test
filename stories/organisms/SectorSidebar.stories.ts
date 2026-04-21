import type { Meta, StoryObj } from '@storybook/vue3'
import SectorSidebar from '@/components/organisms/SectorSidebar.vue'

const meta = {
  title: 'Organisms/SectorSidebar',
  component: SectorSidebar,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div style="height: 600px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SectorSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
