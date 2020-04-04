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
		<MenuBar
			ref="menubar"
			:editor="editor"
			:is-rich-editor="true"
			:is-public="false"
			:autohide="false">
			<slot />
		</MenuBar>
		<MenuBubble :editor="editor" />
		<EditorContent class="editor__content" :editor="editor" />
	</div>
</template>

<script>
import Vue from 'vue'
import { createEditor, markdownit, createMarkdownSerializer, serializePlainText, loadSyntaxHighlight, MarkdownEditor } from './editor'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import MenuBar from './components/MenuBar'
import MenuBubble from './components/MenuBubble'
import { Editor as TiptapEditor } from 'tiptap'

Vue.prototype.t = (app, text) => text

const EDITOR_TYPES = {
	PLAIN: 'plain',
	MARKDOWN: 'markdown',
	RICH: 'rich'
}
export default {
	name: 'Editor',
	components: {
		EditorContent,
		EditorMenuBar,
		MenuBar,
		MenuBubble
	},
	props: {
		editorProps: {
			type: Object,
			default: () => { return {} }
		},
		type: {
			type: String,
			default: EDITOR_TYPES.RICH
		},
		content: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			editor: null
		}
	},
	mounted() {
		const props = {
			editorClass: this.type === EDITOR_TYPES.MARKDOWN ? MarkdownEditor : TiptapEditor,
			enableRichEditing: true,
			languages: undefined,
			content: this.content,
			...this.editorProps,
			onUpdate: (state) => {
				if (this.type === EDITOR_TYPES.MARKDOWN) {
					this.$emit('update', this.editor.getMarkdown())
				} else {
					this.$emit('update', this.editor.getHTML())
				}
				this.editorProps.onUpdate && this.editorProps.onUpdate(state)
			},
		}
		this.editor = createEditor(props)
	},
	beforeDestroy() {
		this.editor.destroy()
	}
}
</script>
<style scoped lang="scss">
@mixin icon($icon-name) {
	.icon-#{$icon-name} {
		background-image: url('./img/#{$icon-name}.svg');
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

	@import './prosemirror'
}
</style>