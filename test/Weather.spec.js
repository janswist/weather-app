import { mount, flushPromises } from'@vue/test-utils'
import Weather from '@/components/Weather.vue'
import { vi, describe, it, expect } from 'vitest'

// mock Browser API
const setStateInNavigator = state =>
  vi.stubGlobal('navigator', {
    permissions: {
      query: () => ({ state })
    },
    geolocation: {
      getCurrentPosition: () => ({ latitude: 51, longitude: 29})
    }
  })

setStateInNavigator('granted')

describe("Weather.vue", () => {

  it("should render page content is correct", () => {
    const wrapper = mount(Weather)

    expect(wrapper.text()).toHaveLength > 1
  })
  
  it("should render main header correctly", () => {
    const headerMsg = 'Welcome to the weather report app'
    const wrapper = mount(Weather)

    expect(wrapper.find('h1').text()).toContain(headerMsg)
  })

  it("should render title for 'granted' state", async () => {
    const title = 'The weather today is:'
    const wrapper = mount(Weather)

    await flushPromises()

    expect(wrapper.find('h2').text()).toEqual(title)
  })

  it("should render title for 'denied' state", async () => {
    
    setStateInNavigator('denied')
    
    const msg = 'Can\'t fetch'
    const wrapper = mount(Weather)

    vi.spyOn(window, 'alert').mockImplementation(() => {})

    await flushPromises()

    expect(wrapper.text()).toContain(msg)
  })
})