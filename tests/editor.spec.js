require('regenerator-runtime/runtime');

import { mount, shallowMount } from '@vue/test-utils'
import Editor from '@/components/Editor.vue'

describe('Empty test', () => {
	it('Renders the component', async () => {
		const wrapper = mount(Editor, {
			propsData: {},
		})

		expect(wrapper.text()).toEqual('')
	})

})