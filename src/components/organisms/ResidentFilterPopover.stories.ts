import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import ResidentFilterPopover from './ResidentFilterPopover.vue'
import { mockResidents } from '@/__mocks__/residents'

const meta = {
  title: 'Organisms/ResidentFilterPopover',
  component: ResidentFilterPopover,
  tags: ['autodocs'],
} satisfies Meta<typeof ResidentFilterPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { ResidentFilterPopover },
    setup() {
      const triggerRef = ref<HTMLElement | null>(null)
      const show = ref(false)

      function toggle() {
        show.value = !show.value
      }

      return { triggerRef, show, toggle, residents: mockResidents }
    },
    template: `
      <div style="padding: 16px;">
        <button ref="triggerRef" @click="toggle" style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px;">
          Filtrer par résident
        </button>
        <ResidentFilterPopover
          v-if="show"
          :residents="residents"
          :trigger-ref="triggerRef"
          @filter="show = false"
          @close="show = false"
        />
      </div>
    `,
  }),
}
