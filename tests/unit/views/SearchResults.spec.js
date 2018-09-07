import { shallowMount } from '@vue/test-utils'
import SearchResults from '@/views/SearchResults'

describe('SearchResults.vue', () => {
  it('get the search prop', () => {
    const query = 'twitter'
    const wrapper = shallowMount(SearchResults, {
      propsData: { search: query }
    })
    expect(wrapper.props().search).toMatch(query)
  })
})
