# TipTap Editor component for Nextcloud


This library provides an opinionated tiptap wrapper with support for Markdown that was created initially for Nextcloud Text.

## Installation

Nextcloud Text is not yet available on npm.
You will need to clone and make it available with npm link locally:

```sh
git clone https://github.com/juliushaertl/nextcloud-text.git
cd nextcloud-text
yarn
yarn dev
npm link  # might require sudo
```

Afterwards you can add it to your project:

```
cd myproject
npm link nextcloud-text
```

## Usage

Nextcloud Text exports a Vue Component you can use as your editor:


```
<template>
	<Editor :content="text" ref="editor" type="markdown" @update="updateText" />
</template>

<script>
import Editor from 'nextcloud-text'

export default {
    name: 'Markdown',
    mounted() {
        console.log(this.$refs.editor)
    },
    data() {
        return {
            text: ''
		},
	},
    methods: {
        updateText(text) {
            this.text = text
        }
    }
}
</script>

```

For more examples see the [source of the docs](.vuepress/components).
