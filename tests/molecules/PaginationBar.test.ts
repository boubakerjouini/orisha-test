import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PaginationBar from '@/components/molecules/PaginationBar.vue'

const baseProps = {
  currentPage: 1,
  totalPages: 5,
  totalItems: 50,
  pageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
}

describe('PaginationBar', () => {
  it('displays correct range text', () => {
    const wrapper = mount(PaginationBar, { props: baseProps })
    expect(wrapper.text()).toContain('1-10 sur 50 résidents')
  })

  it('disables prev button on first page', () => {
    const wrapper = mount(PaginationBar, { props: baseProps })
    const prevButton = wrapper.find('button')
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('emits update:currentPage when clicking next', async () => {
    const wrapper = mount(PaginationBar, { props: baseProps })
    const buttons = wrapper.findAll('button')
    const nextButton = buttons[buttons.length - 1]
    await nextButton.trigger('click')
    expect(wrapper.emitted('update:currentPage')).toBeTruthy()
    expect(wrapper.emitted('update:currentPage')![0]).toEqual([2])
  })

  it('emits update:pageSize when changing select', async () => {
    const wrapper = mount(PaginationBar, { props: baseProps })
    const select = wrapper.find('select')
    await select.setValue('20')
    expect(wrapper.emitted('update:pageSize')).toBeTruthy()
    expect(wrapper.emitted('update:pageSize')![0]).toEqual([20])
  })
})
