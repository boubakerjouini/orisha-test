import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import FilterBar from './FilterBar.vue'

describe('FilterBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders search input', () => {
    const wrapper = mount(FilterBar)
    const input = wrapper.find('input[type="text"]')
    expect(input.exists()).toBe(true)
  })

  it('renders "Nouveau résident" button', () => {
    const wrapper = mount(FilterBar)
    expect(wrapper.text()).toContain('Nouveau résident')
  })
})
