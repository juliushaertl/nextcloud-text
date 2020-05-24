<!--
  - @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->
<template>
	<div class="editor">
		<MenuBar v-if="isRichEditor"
			ref="menubar"
			:editor="editor"
			:is-rich-editor="isRichEditor"
			:is-public="false"
			:autohide="false">
			<slot />
		</MenuBar>
		<MenuBubble v-if="isRichEditor" :editor="editor" />
		<EditorContent class="editor__content" :editor="editor" />
	</div>
</template>

<script>
import Vue from 'vue'
import { createEditor, MarkdownEditor, serializePlainText } from './../editor'
import { EditorContent, Editor as TiptapEditor } from 'tiptap'
import { Placeholder } from 'tiptap-extensions'
import MenuBar from './MenuBar'
import MenuBubble from './MenuBubble'

Vue.prototype.t = (app, text) => text

const EDITOR_TYPES = {
	PLAIN: 'plain',
	MARKDOWN: 'markdown',
	RICH: 'rich',
}
export default {
	name: 'Editor',
	components: {
		EditorContent,
		MenuBar,
		MenuBubble,
	},
	props: {
		editorProps: {
			type: Object,
			default: () => ({}),
		},
		type: {
			type: String,
			default: EDITOR_TYPES.RICH,
		},
		content: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			editor: null,
		}
	},
	computed: {
		isRichEditor() {
			return this.type !== EDITOR_TYPES.PLAIN
		},
	},
	mounted() {
		const props = {
			editorClass: this.type === EDITOR_TYPES.MARKDOWN ? MarkdownEditor : TiptapEditor,
			enableRichEditing: this.type !== EDITOR_TYPES.PLAIN,
			languages: undefined,
			content: this.type !== EDITOR_TYPES.PLAIN ? this.content : '<code><pre>' + this.content + '</pre></code>',
			...this.editorProps,
			onUpdate: (state) => {
				switch (this.type) {
				case EDITOR_TYPES.MARKDOWN:
					this.$emit('update', this.editor.getMarkdown())
					break
				case EDITOR_TYPES.RICH:
					this.$emit('update', this.editor.getHTML())
					break
				case EDITOR_TYPES.PLAIN:
					this.$emit('update', serializePlainText(this.editor))
					break
				}
				this.editorProps.onUpdate && this.editorProps.onUpdate(state)
			},
			extensions: [
				new Placeholder({
					emptyNodeClass: 'is-empty',
					emptyNodeText: this.placeholder,
					showOnlyWhenEditable: true,
				}),
			],
		}
		this.editor = createEditor(props)
	},
	beforeDestroy() {
		this.editor.destroy()
	},
	methods: {
		setContent(content) {
			this.editor.setContent(this.type !== EDITOR_TYPES.PLAIN ? this.content : '<code><pre>' + this.content + '</pre></code>',)
		},
	},
}
</script>
<style scoped lang="scss">
@mixin icon($icon-name) {
	.icon-#{$icon-name} {
		background-image: url("../img/#{$icon-name}.svg");
		background-size: 16px;
		background-repeat: no-repeat;
	}
}
.editor {
	position: relative;
}

.editor::v-deep {
	@include icon('bold');
	@include icon('checklist');
	@include icon('code');
	@include icon('h1');
	@include icon('h2');
	@include icon('h3');
	@include icon('h4');
	@include icon('h5');
	@include icon('h6');
	@include icon('hr');
	@include icon('image');
	@include icon('italic');
	@include icon('link');
	@include icon('mention');
	@include icon('ol');
	@include icon('paragraph');
	@include icon('quote');
	@include icon('redo');
	@include icon('remove');
	@include icon('strike');
	@include icon('ul');
	@include icon('underline');
	@include icon('undo');

	@import './../styles/prosemirror'
}
</style>
