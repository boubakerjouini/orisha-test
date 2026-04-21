import type { Meta, StoryObj } from '@storybook/vue3'
import { useRouter } from 'vue-router'
import BreadcrumbBar from '@/components/molecules/BreadcrumbBar.vue'

const meta = {
  title: 'Molecules/BreadcrumbBar',
  component: BreadcrumbBar,
  tags: ['autodocs'],
} satisfies Meta<typeof BreadcrumbBar>

export default meta
type Story = StoryObj<typeof meta>

export const ListPage: Story = {
  decorators: [
    (story) => ({
      components: { story },
      setup() {
        const router = useRouter()
        router.replace('/')
      },
      template: '<story />',
    }),
  ],
}

export const DetailPage: Story = {
  decorators: [
    (story) => ({
      components: { story },
      setup() {
        const router = useRouter()
        router.replace('/resident/1')
      },
      template: '<story />',
    }),
  ],
}
