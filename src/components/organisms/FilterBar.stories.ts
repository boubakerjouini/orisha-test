import type { Meta, StoryObj } from '@storybook/vue3'
import FilterBar from './FilterBar.vue'
import { useFilterStore } from '@/stores/filters'

const meta = {
  title: 'Organisms/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (story) => ({
      components: { story },
      setup() {
        const store = useFilterStore()
        store.search = 'Durand'
      },
      template: '<story />',
    }),
  ],
}
