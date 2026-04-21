import type { Meta, StoryObj } from '@storybook/vue3'
import DefaultLayout from './DefaultLayout.vue'

const meta = {
  title: 'Layouts/DefaultLayout',
  component: DefaultLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DefaultLayout>

export default meta
type Story = StoryObj<typeof meta>

export const ListPage: Story = {
  render: () => ({
    components: { DefaultLayout },
    template: `
      <DefaultLayout>
        <div style="padding: 24px;">
          <h2 style="font-size: 20px; font-weight: 500; margin-bottom: 16px;">Residents list page content</h2>
          <p style="color: #6b7280;">This slot content simulates a page rendered inside the default layout.</p>
        </div>
      </DefaultLayout>
    `,
  }),
}
