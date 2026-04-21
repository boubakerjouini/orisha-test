import type { Meta, StoryObj } from '@storybook/vue3'
import InfoBlock from '@/components/molecules/InfoBlock.vue'

const meta = {
  title: 'Molecules/InfoBlock',
  component: InfoBlock,
  tags: ['autodocs'],
} satisfies Meta<typeof InfoBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Chambre',
    value: '283',
  },
}

export const LongValue: Story = {
  args: {
    label: 'Nom de naissance',
    value: 'née RICHARD, Madeleine, Françoise, Jacqueline',
  },
}
