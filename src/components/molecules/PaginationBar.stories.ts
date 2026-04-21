import type { Meta, StoryObj } from '@storybook/vue3'
import PaginationBar from './PaginationBar.vue'

const meta = {
  title: 'Molecules/PaginationBar',
  component: PaginationBar,
  tags: ['autodocs'],
  args: {
    totalItems: 50,
    totalPages: 5,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  },
} satisfies Meta<typeof PaginationBar>

export default meta
type Story = StoryObj<typeof meta>

export const FirstPage: Story = {
  args: {
    currentPage: 1,
  },
}

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
  },
}

export const LastPage: Story = {
  args: {
    currentPage: 5,
  },
}
