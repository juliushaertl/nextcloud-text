<template>
    <div>
        <h2>JavaScript</h2>
        <Editor :content="js" type="plain" :editor-props="editorProps"/>
        <h2>CSS</h2>
        <Editor :content="css" type="plain" :editor-props="editorProps"/>
    </div>
</template>

<script>
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import 'highlight.js/styles/github.css';

const languages = { javascript, css }
export default {
    name: 'Code',
    data() {
        return {
            css: `body { color: red; }`,
            js: `const example = 'Hello world'
console.debug(example)`,
            editorProps: {
                languages: languages
            },
        }
    }
}
</script>
<style lang="scss">

pre {
  &::before {
    content: attr(data-language);
    text-transform: uppercase;
    display: block;
    text-align: right;
    font-weight: bold;
    font-size: 0.6rem;
  }
  code {
    .hljs-comment,
    .hljs-quote {
      color: #999999;
    }
    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f2777a;
    }
    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #f99157;
    }
    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #99cc99;
    }
    .hljs-title,
    .hljs-section {
      color: #ffcc66;
    }
    .hljs-keyword,
    .hljs-selector-tag {
      color: #6699cc;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: 700;
    }
  }
}
</style>