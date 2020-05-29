import { markdownit, createEditor, createMarkdownSerializer } from './../src/editor';
import spec from "./fixtures/commonmark"

const markdownThroughEditor = (markdown) => {
  const tiptap = createEditor({
    content: markdownit.render(markdown),
    enableRichEditing: true
  })
  const serializer = createMarkdownSerializer(tiptap.nodes, tiptap.marks)
  return serializer.serialize(tiptap.state.doc)
}

const markdownThroughEditorHtml = (html) => {
  const tiptap = createEditor({
    content: html,
    enableRichEditing: true
  })
  const serializer = createMarkdownSerializer(tiptap.nodes, tiptap.marks)
  return serializer.serialize(tiptap.state.doc)
}

describe('Commonmark', () => {
  beforeAll(() => {
    // Make sure html tests pass
    // entry.section === 'HTML blocks' || entry.section === 'Raw HTML'
    markdownit.set({ html: true})
  })
  afterAll(() => {
    markdownit.set({ html: false})
  })

  // failures because of some additional newline in markdownit
  const skippedMarkdownTests = [
      181, 202, 203,
	  87
  ];

  spec.forEach((entry) => {
    if (skippedMarkdownTests.indexOf(entry.example) !== -1) {
	  test.skip('commonmark ' + entry.example, () => {})
      return
    }
    test('commonmark ' + entry.example, () => {
      expect(markdownit.render(entry.markdown).split('\n').join('')).toBe(entry.html.split('\n').join(''), entry)
    })
  })
})

describe('Markdown though editor', () => {
  test('headlines', () => {
    expect(markdownThroughEditor('# Test')).toBe('# Test')
    expect(markdownThroughEditor('## Test')).toBe('## Test')
    expect(markdownThroughEditor('### Test')).toBe('### Test')
    expect(markdownThroughEditor('#### Test')).toBe('#### Test')
    expect(markdownThroughEditor('##### Test')).toBe('##### Test')
  })
  test('inline format', () => {
    expect(markdownThroughEditor('**Test**')).toBe('**Test**')
    expect(markdownThroughEditor('__Test__')).toBe('**Test**')
    expect(markdownThroughEditor('_Test_')).toBe('*Test*')
    expect(markdownThroughEditor('~~Test~~')).toBe('~~Test~~')
  })
  test('ul', () => {
    expect(markdownThroughEditor('- foo\n- bar')).toBe('* foo\n* bar')
    expect(markdownThroughEditor('- foo\n\n- bar')).toBe('* foo\n* bar')
    expect(markdownThroughEditor('- foo\n\n\n- bar')).toBe('* foo\n* bar')
  })
  test('ol', () => {
    expect(markdownThroughEditor('1. foo\n2. bar')).toBe('1. foo\n2. bar')
  })
  test('paragraph', () => {
    expect(markdownThroughEditor('foo\nbar\n\nfoobar\n\tfoobar')).toBe('foo bar\n\nfoobar foobar')
  })
  test('links', () => {
    expect(markdownThroughEditor('[test](foo)')).toBe('[test](foo)')
  })
  test.skip('images', () => {
    // FIXME: image node not loaded right now
    expect(markdownThroughEditor('![test](foo)')).toBe('![test](foo)')
  })
  test('special characters', () => {
    expect(markdownThroughEditor('"\';&.-#><')).toBe('"\';&.-#><')
  })
  test('checkboxes', () => {
    expect(markdownThroughEditor('- [ ] [asd](sdf)')).toBe('* [ ] [asd](sdf)')
    expect(markdownThroughEditor('- [x] [asd](sdf)')).toBe('* [x] [asd](sdf)')
    expect(markdownThroughEditor('- [ [asd](sdf)')).toBe('* [ [asd](sdf)')
	expect(markdownThroughEditor('- [ ] asd')).toBe('* [ ] asd')
	expect(markdownThroughEditor('- [ ] foo\n- [x] bar')).toBe('* [ ] foo\n* [x] bar')
	expect(markdownThroughEditor('- [x] foo\n' +
		  '  - [ ] bar\n' +
		  '  - [x] baz\n' +
		  '- [ ] bim')).toBe('* [x] foo\n' +
		  '  * [ ] bar\n' +
		  '  * [x] baz\n' +
		  '* [ ] bim')
	expect(markdownThroughEditor('- [X] asd')).toBe('* [x] asd')
	expect(markdownThroughEditor('- [\t] asd')).toBe('* [ ] asd')
	expect(markdownThroughEditor('- [  ] asd')).toBe('* [ ] asd')
	expect(markdownThroughEditor('-   [X] asd')).toBe('* [x] asd')
	expect(markdownThroughEditor('- [F] asd')).toBe('* [F] asd')
  })

  test('escaping', () => {
    const test = '(Asdf [asdf asdf](asdf asdf) asdf asdf asdf asdf asdf asdf asdf asdf asdf)\n' +
        '\n' +
        '* [asdf asdf asdf/asdf](Asdf Asdf)\n' +
        '* asdf asdf asdf [a--f asdf asdf](a--f Asdf Asdf)\n' +
        '* [Asdf asdf asdf asdf asdf asdf](Asdf asdf)'
    expect(markdownThroughEditor(test)).toBe(test)
    expect(markdownThroughEditor('This is a [test] for escaping')).toBe('This is a [test] for escaping')
    expect(markdownThroughEditor('This is a [test for escaping')).toBe('This is a [test for escaping')
  })
})

describe('Markdown serializer from html', () => {
  test('paragraph', () => {
    expect(markdownThroughEditorHtml('<p>hello</p><p>world</p>')).toBe('hello\n\nworld')
  })
  test('links', () => {
    expect(markdownThroughEditorHtml('<a href="foo">test</a>')).toBe('[test](foo)')
  })
  test.skip('images', () => {
    expect(markdownThroughEditorHtml('<img src="image" alt="description" />')).toBe('![description](image)')
  })
	test('checkboxes', () => {
		expect(markdownThroughEditorHtml('<ul><li><input type="checkbox" checked /><label>foo</label></li></ul>')).toBe('* [x] foo')
		expect(markdownThroughEditorHtml('<ul><li><input type="checkbox" /><label>test</label></li></ul>')).toBe('* [ ] test')
		expect(markdownThroughEditorHtml('<ul><li><input type="checkbox" checked /><div><h2>Test</h2><p><strong>content</strong></p></div></li></ul>')).toBe('* [x] Test\n\n  **content**')
		expect(markdownThroughEditorHtml('<ul><li><input type="checkbox" checked /><p>Test</p><h1>Block level headline</h1></li></ul>')).toBe('* [x] Test\n\n  # Block level headline')
	})
})
