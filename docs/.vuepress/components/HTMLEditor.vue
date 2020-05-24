<template>
<div>
    <textarea v-model="text" @input="updateContent" />
	<Editor :content="text" ref="editor" :editor-props="editorProps" placeholder="Add some awesome text 🚀" @update="updateText">
        <strong>Right menu bar slot</strong>
    </Editor>
</div>
</template>

<script>
export default {
    name: 'HTMLEditor',
    data() {
        return {
            editorProps: {
                onUpdate: (state) => {
                    console.debug('onUpdate called', state.getHTML())
                }
            },
            text: `<h1>Hello world</h1><p><em>This</em> is a <strong>text</strong></p>`
        }
    },
    methods: {
        updateContent(event) {
            this.$refs.editor.editor.setContent(event.target.value)
        },
        updateText(text) {
            this.text = text
        }
    }
}
</script>