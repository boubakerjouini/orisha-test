import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from './Badge.vue'

describe('Badge', () => {
  it('renders label text', () => {
    const wrapper = mount(Badge, {
      props: { label: 'Présent', color: '#00C851' },
    })
    expect(wrapper.text()).toBe('Présent')
  })

  it('applies correct status classes for #00C851 (green)', () => {
    const wrapper = mount(Badge, {
      props: { label: 'Présent', color: '#00C851' },
    })
    const el = wrapper.find('span')
    expect(el.classes()).toContain('bg-status-green-bg')
    expect(el.classes()).toContain('border-status-green-border')
    expect(el.classes()).toContain('text-status-green-text')
  })

  it('applies correct status classes for #FFA100 (orange)', () => {
    const wrapper = mount(Badge, {
      props: { label: 'Sortie temporaire', color: '#FFA100' },
    })
    const el = wrapper.find('span')
    expect(el.classes()).toContain('bg-status-orange-bg')
    expect(el.classes()).toContain('border-status-orange-border')
    expect(el.classes()).toContain('text-status-orange-text')
  })
})
