import type { Meta, StoryObj } from '@storybook/vue3'
import SearchInput from '@/components/atoms/SearchInput.vue'

const meta: Meta<typeof SearchInput> = {
  component: SearchInput,
  title: 'Atoms/SearchInput',
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof SearchInput>

export const Empty: Story = {
  args: {
    modelValue: '',
  },
}

export const WithValue: Story = {
  args: {
    modelValue: 'Jean Dupont',
  },
}
