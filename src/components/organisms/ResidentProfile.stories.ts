import type { Meta, StoryObj } from '@storybook/vue3'
import ResidentProfile from './ResidentProfile.vue'
import { createMockResident } from '@/__mocks__/residents'

const meta = {
  title: 'Organisms/ResidentProfile',
  component: ResidentProfile,
  tags: ['autodocs'],
} satisfies Meta<typeof ResidentProfile>

export default meta
type Story = StoryObj<typeof meta>

export const Male: Story = {
  args: {
    resident: createMockResident({
      nomComplet: 'M. DURAND Gaston (H)',
      isFavorite: false,
    }),
  },
}

export const Female: Story = {
  args: {
    resident: createMockResident({
      nomComplet: 'Mme THOMAS Madeleine (F)',
      nomNaissance: 'née RICHARD',
      isFavorite: false,
    }),
  },
}

export const Favorite: Story = {
  args: {
    resident: createMockResident({
      nomComplet: 'M. DURAND Gaston (H)',
      isFavorite: true,
    }),
  },
}
